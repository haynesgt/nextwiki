import type {NextApiRequest, NextApiResponse} from "next";
import {createPage, getPage, updatePage} from "../../../../lib/server/pages";
import {unArray} from "../../../../lib/util.ts/_util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = unArray(req.query.id);
  if (req.method === "GET") {
    return res.json({
      data: await getPage(id),
    });
  } else if (req.method === "PUT") {
    await updatePage({id, data: req.body});
    return res.status(204).end();
  } else {
    return res.status(405).end();
  }
}