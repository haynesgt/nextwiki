import {array, randomParagraph, srand} from "../../_util";
import {PageData, PageDoc} from "../../_pages";
import { v4 as uuidv4 } from 'uuid';

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
  const id = uuidv4();
  return pages[id] = {id, data};
}

export async function updatePage(newDoc: PageDoc): Promise<PageDoc> {
  const pageDoc = await getPage(newDoc.id);
  if (pageDoc) {
    if (newDoc.data.title) pageDoc.data.title = newDoc.data.title;
    if (newDoc.data.content) pageDoc.data.content = newDoc.data.content;
    return pageDoc;
  }
  throw new Error("Page was missing");
}