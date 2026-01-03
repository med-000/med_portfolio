import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  Page,
  Blog,
  Project,
  Timeline,
  Techstack,
  TimelineYearGroup,
} from "./types";
import {
  getTitleName,
  getMentionTitle,
  getPageContent,
  getCheckbox,
  getMultiSelectList,
  getCoverImageUrl,
  getUrl,
  getRelationIds,
  getText,
  getDateRange,
} from "./getters";

import {
  PAGE_PROPERTIES,
  BLOG_PROPERTIES,
  PROJECT_PROPERTIES,
  TIMELINE_PROPERTIES,
  TECHSTACK_PROPERTIES,
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
    summary: getText(page, PROJECT_PROPERTIES.summary),
    github: getUrl(page, PROJECT_PROPERTIES.github),
    zenn: getUrl(page, PROJECT_PROPERTIES.zenn),
    qiita: getUrl(page, PROJECT_PROPERTIES.qiita),
    techstack: getRelationIds(page, PROJECT_PROPERTIES.techstack),
  };
};

export const normalizeTimeline = (page: PageObjectResponse): Timeline => {
  return {
    id: page.id,
    title: getTitleName(page, TIMELINE_PROPERTIES.title),
    public: getCheckbox(page, TIMELINE_PROPERTIES.public),
    date: getDateRange(page, TIMELINE_PROPERTIES.date),
    techstack: getRelationIds(page, TIMELINE_PROPERTIES.techstack),
  };
};

export const normalizeTechstach = (page: PageObjectResponse): Techstack => {
  return {
    id: page.id,
    title: getTitleName(page, TECHSTACK_PROPERTIES.title),
    public: getCheckbox(page, TECHSTACK_PROPERTIES.public),
    techStackType: getRelationIds(page, TECHSTACK_PROPERTIES.techStackType),
    projects: getRelationIds(page, TECHSTACK_PROPERTIES.projects),
    timeline: getRelationIds(page, TECHSTACK_PROPERTIES.timeline),
  };
};
export const normalizeTimelinesByYear = (
  timelines: Timeline[]
): TimelineYearGroup[] => {
  const map = new Map<number, Timeline[]>();
  for (const timeline of timelines) {
    if (!timeline.date.isValid) continue;
    const year = timeline.date.start.year;
    if (!map.has(year)) {
      map.set(year, []);
    }
    map.get(year)!.push(timeline);
  }
  const groups: TimelineYearGroup[] = Array.from(map.entries()).map(
    ([year, list]) => ({
      year,

      timelines: list.sort((a, b) => {
        return b.date.start.month - a.date.start.month;
      }),
    })
  );
  groups.sort((a, b) => b.year - a.year);
  return groups;
};
