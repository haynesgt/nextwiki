import * as mongodb from "mongodb";
import {array, nowIso8601, randomParagraph, srand} from "../../_util";
import {PageData, PageDoc} from "../../_pages";

const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URL || "mongodb://localhost:27017");

function createPages() {
  srand();
  return array(10).map((_, i) => ({
    id: `${i}`,
    data: {
      title: randomParagraph(5),
      content: randomParagraph(200),
    }
  })).reduce((accum, {id, data}) => ({...accum, [id]: {id, data}}), {});
}

const pages: {[key: string]: PageDoc} = createPages();

export async function getPage(id: string): Promise<PageDoc | undefined> {
  return pages[id];
}

export async function getPages(): Promise<PageDoc[]> {
  return Object.values(pages);
}

export async function createPage(data: PageData): Promise<PageDoc> {
  const id = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
  const now = nowIso8601();
  return pages[id] = {id, data, updatedAt: now, createdAt: now};
}

export async function updatePage(updatedDoc: PageDoc): Promise<PageDoc> {
  const pageDoc = await getPage(updatedDoc.id);
  if (pageDoc) {
    if (updatedDoc.data.title) pageDoc.data.title = updatedDoc.data.title;
    if (updatedDoc.data.content) pageDoc.data.content = updatedDoc.data.content;
    pageDoc.updatedAt = nowIso8601();
    return pageDoc;
  }
  throw new Error("Page was missing");
}