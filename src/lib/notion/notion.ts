import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  MentionRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import type { NotionObject, Blog } from "@/lib/notion/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY!,
});

const BLOG_PROPERTIES = {
  title: "title",
  public: "public",
  qiita: "qiita",
  zenn: "zenn",
} as const;

const isPage = (item: unknown): item is PageObjectResponse => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const obj = item as NotionObject;

  if (obj.object === "page") {
    return true;
  }
  return false;
};

const isDatabase = (item: unknown): item is DatabaseObjectResponse => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const obj = item as NotionObject;

  if (obj.object === "database") {
    return true;
  }
  return false;
};

const isPageMention = (
  item: RichTextItemResponse
): item is MentionRichTextItemResponse & {
  type: "mention";
  mention: { type: "page"; page: { id: string } };
} => {
  if (item.type === "mention" && item.mention.type === "page") {
    return true;
  }
  return false;
};

const getCheckbox = (page: PageObjectResponse, name: string): boolean => {
  const prop = page.properties[name];
  if (!prop) return false;
  if (prop.type !== "checkbox") return false;
  return prop.checkbox;
};

const getTitle = (
  page: PageObjectResponse,
  name: string
): RichTextItemResponse[] => {
  const prop = page.properties[name];
  if (!prop || prop.type !== "title") return [];
  return prop.title;
};

const getPageMention = (texts: RichTextItemResponse[]) => {
  return texts.find(isPageMention);
};

const getMentionTitle = (page: PageObjectResponse, name: string) => {
  const texts = getTitle(page, name);
  const mention = getPageMention(texts);

  if (!mention) {
    return {
      title: "",
      mentionPageId: "",
    };
  }

  return {
    title: mention.plain_text,
    mentionPageId: mention.mention.page.id,
  };
};

export const fetchBlogPages = async () => {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "public",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return response.results;
};

export const normalizeBlog = (page: PageObjectResponse): Blog => {
  const { title, mentionPageId } = getMentionTitle(page, BLOG_PROPERTIES.title);

  return {
    id: page.id,
    title,
    mentionPageId,
    public: getCheckbox(page, BLOG_PROPERTIES.public),
    qiita: getCheckbox(page, BLOG_PROPERTIES.qiita),
    zenn: getCheckbox(page, BLOG_PROPERTIES.zenn),
  };
};

export const getBlogs = async (): Promise<Blog[]> => {
  const pages = await fetchBlogPages();
  return pages.filter(isPage).map(normalizeBlog);
};

export const notion2markdown = async (pageId: string) => {
  const n2m = new NotionToMarkdown({
    notionClient: notion,
  });

  const title = await getPageTitle(pageId);
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return {
    title,
    content: mdString.parent,
  };
};

export const getPageTitle = async (pageId: string): Promise<string> => {
  const page = await notion.pages.retrieve({ page_id: pageId });

  if (!("properties" in page)) return "";

  const titleProp = Object.values(page.properties).find(
    (p): p is Extract<typeof p, { type: "title" }> => p.type === "title"
  );

  if (!titleProp) return "";

  return titleProp.title.map((t) => t.plain_text).join("");
};
