import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Response = {
  valid: boolean;
};

interface ApiResponseType {
  [key: string]: { token: string };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let { token } = req.body;

  let response: ApiResponseType = (
    await axios.get(`${process.env.API_BASE_URI}/tokens.json`)
  ).data;

  const checkForExistingToken = Object.entries(response).find(
    (node) => node[1].token === token
  );

  if (!checkForExistingToken) return res.status(403).json({ valid: false });
  if (checkForExistingToken.length) {
    await axios.delete(
      `${process.env.API_BASE_URI}/tokens/` + checkForExistingToken[0] + ".json"
    );

    return res.status(200).json({ valid: true });
  }
  return res.status(403).json({ valid: false });
}
