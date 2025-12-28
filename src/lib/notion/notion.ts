import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Blog = {
  id: string;
  title: string;
  pageId: string;
  public: boolean;
  qiita: boolean;
  zenn: boolean;
};
type NotionObject = {
  object?: unknown;
  properties?: unknown;
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY!,
});

const BLOG_PROPERTIES = {
  title: "title",
  public: "public",
  qiita: "qiita",
  zenn: "zenn",
} as const;

export const isPage = (item: unknown): item is PageObjectResponse => {
  if (typeof item !== "object" || item === null) return false;

  const obj = item as NotionObject;

  return (
    obj.object === "page" &&
    typeof obj.properties === "object" &&
    obj.properties !== null
  );
};

const getMentionTitle = (
  page: PageObjectResponse,
  name: string
): { title: string; pageId: string } => {
  const prop = page.properties[name];

  if (!prop || prop.type !== "title") {
    return { title: "", pageId: "" };
  }

  const item = prop.title[0];
  if (!item || item.type !== "mention" || item.mention.type !== "page") {
    return { title: "", pageId: "" };
  }

  return {
    title: item.plain_text ?? "",
    pageId: item.mention.page.id,
  };
};

const getCheckbox = (page: PageObjectResponse, name: string): boolean => {
  const prop = page.properties[name];
  return prop?.type === "checkbox" ? prop.checkbox : false;
};

export const fetchBlogPages = async () => {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const normalizeBlog = (page: PageObjectResponse): Blog => {
  const { title, pageId } = getMentionTitle(page, BLOG_PROPERTIES.title);

  return {
    id: page.id,
    title,
    pageId,
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

  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString;
};
