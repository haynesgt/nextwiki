import type {NextApiRequest, NextApiResponse} from "next";
import {getPages} from "./_data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    data: await getPages()
  });
}