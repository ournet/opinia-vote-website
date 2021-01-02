import { NextApiRequest, NextApiResponse } from "next";
import { ApiGetStatementListParams } from "../../../lib/api-client/use-statement-list";
import dataClient from "../../../lib/data-client";

const getStatements = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    orderBy,
    languageCode,
    limit,
    offset
  }: ApiGetStatementListParams = req.query as never;

  if (!orderBy || !languageCode || !limit) return res.status(400).end();

  const list = await dataClient.statement.list({
    where: { languageCode },
    orderBy,
    take: limit,
    skip: offset
  });

  res.json(list);
};

// GET /api/statements
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return getStatements(req, res);
  res.status(404).end();
}
