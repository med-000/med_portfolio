import type { Page, Blog, Project } from "@/lib/notion/types";
import { cache } from "react";
import { isPage } from "./guards";
import { normalizePage, normalizeBlog, normalizeProject } from "./normalizers";
import { fetchBlogDB, fetchProjectDB, fetchPage } from "./fetchers";

export const getPages = cache(async (pageId: string): Promise<Page> => {
  const pages = await fetchPage(pageId);
  return normalizePage(pages);
});

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const pages = await fetchBlogDB();
  return pages.filter(isPage).map(normalizeBlog);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const pages = await fetchProjectDB();
  return pages.filter(isPage).map(normalizeProject);
});
