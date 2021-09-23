import type {NextApiRequest, NextApiResponse} from "next";
import {createPage, getPage, updatePage} from "../_data";
import {unArray} from "../../../_util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = unArray(req.query.id);
  if (req.method === "GET") {
    return res.json({
      data: await getPage(id),
    });
  } else if (req.method === "PUT") {
    const page = await updatePage({id, data: req.body});
    return res.json({data: page});
  } else {
    res.status(405);
  }
}