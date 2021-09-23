import {PageDoc} from "../_pages";

export async function getPage(id: string): Promise<PageDoc | undefined> {
  const response = await fetch(`/api/pages/${id}`);
  const page = await response.json();
  return page?.data;
}

export async function getPages(): Promise<PageDoc[]> {
  const response = await fetch("/api/pages");
  const pages = await response.json();
  return pages?.data;
}