import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import statementVote from "../../../lib/statement-vote";
import { useSession, getSession } from "next-auth/client";

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Number(req.query.id);
  const session = await getSession({ req });
  if (!session) return res.status(403);
  console.log(session);
  res.json(session);
  // const vote = await statementVote.vote({
  //   statementId:id,
  //   userId: session.
  // });
  // res.json(post);
};

// PUT /api/statement-vote/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (req.method === "POST") return createVote(req, res);
  res.status(404);
}
