import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import dataClient from "../../../lib/data-client";
import { StatementCountsType } from "../../../lib/types";

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  const statementId = Number(req.body.statementId || req.query.statementId);
  const points = Number(req.body.points || req.query.points);
  // const session = await getSession({ req });
  // if (!session) return res.status(403).end();

  const vote = await dataClient.statement.vote({
    statementId,
    userId: 1, //session.user.
    points
  });

  const result: StatementCountsType = {
    id: vote.id,
    countMinusVotes: vote.countMinusVotes,
    countPlusVotes: vote.countPlusVotes
  };

  res.json(result);
};

// POST /api/votes
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") return createVote(req, res);
  res.status(404).end();
}
