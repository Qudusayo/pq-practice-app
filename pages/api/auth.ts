// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { v4 as uuid } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

type Response = {
  valid: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let { token } = req.body;
  let tokens = fs.readFileSync("./tokens.json").toString("utf8");
  const valid = JSON.parse(tokens).find((tk: string) => tk === token);
  let filteredTokens;

  if (valid) {
    filteredTokens = JSON.parse(tokens).filter((tk: string) => tk !== token);
    fs.writeFileSync("./tokens.json", JSON.stringify(filteredTokens, null, 2));

    return res.status(200).json({ valid });
  } else {
    return res.status(403).json({ valid });
  }
}
