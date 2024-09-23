// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import ges107Qs from "../../apis/ges-107.json";
import ges108Qs from "../../apis/ges-108.json";
import ges301Qs from "../../apis/ges-301.json";

type Data = {
  question: string;
  options: {
    A: string;
    B: string;
    C?: string;
    D?: string;
  };
  answer: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { questionType } = req.query;
  let response;

  if (questionType === "GES-107") {
    response = ges107Qs;
  } else if (questionType === "GES-301") {
    response = ges301Qs;
  } else {
    response = ges108Qs;
  }

  res.status(200).json(response);
}
