import {array, randomParagraph, setCancellableTimeout, srand} from "../_util";

export interface PageDoc {
  id: string;
  data: {
    title: string;
    content: string;
  }
}

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