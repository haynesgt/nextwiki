import {array, randomParagraph, srand} from "../../_util";
import {PageDoc} from "../../_pages";

function createPages() {
  srand();
  return array(10).map((_, i) => ({
    id: `${i}`,
    data: {
      title: randomParagraph(5),
      content: randomParagraph(200),
    }
  }));
}

const pages: PageDoc[] = createPages();

export async function getPage(id: string): Promise<PageDoc | undefined> {
  return pages.find(page => page.id === id);
}

export async function getPages(): Promise<PageDoc[]> {
  return pages;
}