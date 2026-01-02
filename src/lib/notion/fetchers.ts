import { notion } from "./client";
import { isPage } from "./guards";

export const fetchPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  if (!isPage(response)) {
    throw new Error("This page is a partial page");
  }
  return response;
};

export const fetchDB = async (databaseId: string) => {
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
