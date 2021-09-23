import type {NextApiRequest, NextApiResponse} from "next";
import {createPage, getPage} from "../_data";
import {unArray} from "../../../_util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = unArray(req.query.id);
  if (req.method === "GET") {
    return res.json({
      data: await getPage(id),
    });
  } else if (req.method === "POST") {
    const page = await createPage(req.body);
    return res.json({data: page});
  }
}