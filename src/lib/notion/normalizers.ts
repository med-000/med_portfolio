import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Page, Blog, Project } from "./types";
import {
  getTitleName,
  getMentionTitle,
  getPageContent,
  getCheckbox,
  getMultiSelect,
} from "./getters";

import {
  PAGE_PROPERTIES,
  BLOG_PROPERTIES,
  PROJECT_PROPERTIES,
} from "./constants";

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
  return {
    id: page.id,
    title: getTitleName(page, BLOG_PROPERTIES.title),
    mentionPageId: getMentionTitle(page, BLOG_PROPERTIES.title),
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
