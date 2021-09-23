import {PageData, PageDoc} from "../data/pages";

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

export async function createPage(data: PageData): Promise<PageDoc> {
  const response = await fetch("/api/pages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  });
  const pages = await response.json();
  return pages?.data;
}

export async function updatePage(doc: PageDoc): Promise<void> {
  const response = await fetch(`/api/pages/${doc.id}`, {
    method: "PUT",
    body: JSON.stringify(doc.data),
    headers: {"Content-Type": "application/json"}
  });
  await response.text()
}