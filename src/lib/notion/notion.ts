import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  MentionRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import type { NotionObject, Page, Blog, Project } from "@/lib/notion/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY!,
});

const PAGE_PROPERTIES = {
  id: "id",
  title: "title",
  content: "content",
};

const BLOG_PROPERTIES = {
  title: "title",
  public: "public",
  qiita: "qiita",
  zenn: "zenn",
} as const;

const PROJECT_PROPERTIES = {
  title: "title",
  public: "public",
  tag: "tag",
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

const getMultiSelect = (page: PageObjectResponse, name: string): object => {
  const prop = page.properties[name];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select;
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

const getTitleName = (page: PageObjectResponse, name: string): string => {
  const prop = page.properties[name];
  if (!prop || prop.type !== "title") return "";

  return prop.title.map((t) => t.plain_text).join("");
};

export const fetchPageInfo = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  if (!isPage(response)) {
    throw new Error("This page is a partial page");
  }
  return response;
};

const getPageContent = async (pageId: string) => {
  const n2m = new NotionToMarkdown({
    notionClient: notion,
  });
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
};

export const fetchBlogDB = async () => {
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

export const fetchProjectDB = async () => {
  const databaseId = process.env.NOTION_PROJECT_DATABASE_ID!;
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

export const normalizePage = async (
  page: PageObjectResponse
): Promise<Page> => {
  return {
    id: page.id,
    title: getTitleName(page, PAGE_PROPERTIES.title),
    content: await getPageContent(page.id),
  };
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

export const normalizeProject = (page: PageObjectResponse): Project => {
  return {
    id: page.id,
    title: getTitleName(page, PROJECT_PROPERTIES.title),
    public: getCheckbox(page, PROJECT_PROPERTIES.public),
    tag: getMultiSelect(page, PROJECT_PROPERTIES.tag),
  };
};

export const getPages = async (pageId: string) => {
  const pages = await fetchPageInfo(pageId);
  const normalized = await normalizePage(pages);
  return normalized;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const pages = await fetchBlogDB();
  return pages.filter(isPage).map(normalizeBlog);
};

export const getProjects = async (): Promise<Project[]> => {
  const pages = await fetchProjectDB();
  return pages.filter(isPage).map(normalizeProject);
};
