import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { n2m } from "./client";

import { isPageMention } from "./guards";
export const getCheckbox = (
  page: PageObjectResponse,
  name: string
): boolean => {
  const prop = page.properties[name];
  if (!prop) return false;
  if (prop.type !== "checkbox") return false;
  return prop.checkbox;
};

export const getMultiSelect = (
  page: PageObjectResponse,
  name: string
): object => {
  const prop = page.properties[name];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select;
};

export const getTitleObject = (
  page: PageObjectResponse,
  name: string
): RichTextItemResponse[] => {
  const prop = page.properties[name];
  if (!prop || prop.type !== "title") return [];
  return prop.title;
};

export const getMentionTitle = (
  page: PageObjectResponse,
  name: string
): string => {
  const texts = getTitleObject(page, name);
  const mention = texts.find(isPageMention);

  if (!mention) {
    return "";
  }

  return mention.mention.page.id;
};

export const getTitleName = (
  page: PageObjectResponse,
  name: string
): string => {
  const prop = getTitleObject(page, name);
  return prop.map((t) => t.plain_text).join("");
};

export const getPageContent = async (pageId: string) => {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
};
