import { NextApiRequest, NextApiResponse } from "next";
import dataClient from "../../../../lib/data-client";

const getCounts = async (req: NextApiRequest, res: NextApiResponse) => {
  const statementId = Number(req.query.id);
  const counts = await dataClient.statement.counts(statementId);

  res.json(counts);
};

// POST /api/statements/[id]/counts
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return getCounts(req, res);
  res.status(404);
}
