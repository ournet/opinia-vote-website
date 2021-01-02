import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import dataClient from "../../../lib/data-client";

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Number(req.query.id);
  const session = await getSession({ req });
  if (!session) return res.status(403);
  console.log(session);
  // res.json(session);

  const vote = await dataClient.statement.vote({
    statementId: id,
    userId: 1, //session.user.
    points: 1
  });
  res.json(vote);
};

// PUT /api/statement-vote/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") return createVote(req, res);
  res.status(404);
}
