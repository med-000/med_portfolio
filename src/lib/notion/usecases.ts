import type { Page, Blog, Project, Timeline } from "@/lib/notion/types";
import { cache } from "react";
import { isPage } from "./guards";
import {
  normalizePage,
  normalizeBlog,
  normalizeProject,
  normalizeTimeline,
} from "./normalizers";
import { fetchDB, fetchPage } from "./fetchers";

export const getPages = cache(async (pageId: string): Promise<Page> => {
  const pages = await fetchPage(pageId);
  return normalizePage(pages);
});

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const pages = await fetchDB(`${process.env.NOTION_BLOG_DATABASE_ID}`);
  return pages.filter(isPage).map(normalizeBlog);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const pages = await fetchDB(`${process.env.NOTION_PROJECT_DATABASE_ID}`);
  return pages.filter(isPage).map(normalizeProject);
});

export const getTimelines = cache(async (): Promise<Timeline[]> => {
  const pages = await fetchDB(`${process.env.NOTION_TIMELINE_DATABASE_ID}`);
  return pages.filter(isPage).map(normalizeTimeline);
});
