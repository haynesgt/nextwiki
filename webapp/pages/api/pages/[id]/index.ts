import type {NextApiRequest, NextApiResponse} from "next";
import {getPage} from "../_data";

function unArray<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = unArray(req.query.id);
  res.json({
    data: await getPage(id),
  })
}