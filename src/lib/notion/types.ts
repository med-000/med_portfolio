export type NotionObject = {
  object: unknown;
};
export type Page = {
  id: string;
  title: string;
  content: string;
};
export type Blog = {
  id: string;
  title: string;
  mentionPageId: string;
  public: boolean;
  qiita: boolean;
  zenn: boolean;
};
export type Project = {
  id: string;
  title: string;
  public: boolean;
  tag: object;
};
