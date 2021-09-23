import {Document} from "bson";

export interface PageData {
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageDoc {
  id: string;
  data: PageData
}

export interface PageDocument extends Document, PageData {
}