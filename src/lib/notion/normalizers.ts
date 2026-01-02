import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Page, Blog, Project, Timeline } from "./types";
import {
  getTitleName,
  getMentionTitle,
  getPageContent,
  getCheckbox,
  getMultiSelectList,
  getCoverImageUrl,
  getUrl,
  getRelationIds,
} from "./getters";

import {
  PAGE_PROPERTIES,
  BLOG_PROPERTIES,
  PROJECT_PROPERTIES,
  TIMELINE_PROPERTIES,
} from "./constants";

export const normalizePage = async (
  page: PageObjectResponse
): Promise<Page> => {
  return {
    id: page.id,
    title: getTitleName(page, PAGE_PROPERTIES.title),
    content: await getPageContent(page.id),
    imageFile: getCoverImageUrl(page),
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
    url: getUrl(page, PROJECT_PROPERTIES.url),
    relation: getRelationIds(page, PROJECT_PROPERTIES.relation),
  };
};

export const normalizeTimeline = (page: PageObjectResponse): Timeline => {
  return {
    id: page.id,
    title: getTitleName(page, TIMELINE_PROPERTIES.title),
    public: getCheckbox(page, TIMELINE_PROPERTIES.public),
    date: getMultiSelectList(page, TIMELINE_PROPERTIES.date),
  };
};
