import * as mongodb from "mongodb";
import {ObjectId} from "mongodb";
import {array, nowIso8601, randomParagraph, srand} from "../util.ts/_util";
import {PageData, PageDoc, PageDocument} from "../data/pages";
import {logging} from "./logging";

// see commit e3aeff2963d8193229bbd59439a8f6326ab9ab23:./pages/api/pages/_data.ts to see this with in-memory data
const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URL || "mongodb://localhost:27017");

// noinspection JSIgnoredPromiseFromCall
mongoClient.connect();

const db = mongoClient.db(process.env.MONGODB_DB || "next-wiki");
const pages = db.collection<PageDocument>("pages");

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

export async function getPage(id: string): Promise<PageDoc | undefined> {
  if (!ObjectId.isValid(id)) {
    return;
  }
  const pageData = await pages.findOne(new ObjectId(id));
  if (pageData) return {id, data: pageData};
}

export async function getPages(): Promise<PageDoc[]> {
  return await pages.find({}).map(page => ({
    id: page._id,
    data: page,
  })).toArray();
}

export async function createPage(data: PageData): Promise<PageDoc> {
  // const id = randomId();
  const now = nowIso8601();
  const doc = {...data, createdAt: now, updatedAt: now};
  const inserted = await pages.insertOne(doc);
  return {id: inserted.insertedId.toHexString(), data: doc};
}

export async function updatePage(updatedDoc: PageDoc): Promise<void> {
  await pages.updateOne({_id: new ObjectId(updatedDoc.id)}, {
    $set:
      {
        title: updatedDoc.data.title,
        content: updatedDoc.data.content,
        updatedAt: nowIso8601(),
      }
  });
}