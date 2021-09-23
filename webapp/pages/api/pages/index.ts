import type {NextApiRequest, NextApiResponse} from "next";
import {createPage, getPages} from "./_data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.json({
      data: await getPages(),
    });
  } else if (req.method === "POST") {
    const page = await createPage(req.body);
    return res.json({
      data: page,
    });
  } else {
    return res.status(405).end();
  }
}
export {createPage} from "./_data";