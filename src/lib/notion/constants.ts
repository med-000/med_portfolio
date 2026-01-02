export const PAGE_PROPERTIES = {
  id: "id",
  title: "title",
  content: "content",
} as const;

export const BLOG_PROPERTIES = {
  title: "title",
  public: "public",
  qiita: "qiita",
  zenn: "zenn",
} as const;

export const PROJECT_PROPERTIES = {
  title: "title",
  public: "public",
  url: "github",
  relation: "techstack",
} as const;

export const TIMELINE_PROPERTIES = {
  title: "title",
  public: "public",
  date: "year/month",
  relation: "techstack",
};
