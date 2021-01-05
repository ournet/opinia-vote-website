import prisma from "./prisma";

export interface StatementVoteParams {
  userId: number;
  statementId: number;
  points: number;
}

const updateStatementCountVotes = async (statementId: number) => {
  const [countMinusVotes, countPlusVotes] = await Promise.all([
    prisma.statementVote.count({ where: { statementId, points: -1 } }),
    prisma.statementVote.count({ where: { statementId, points: 1 } })
  ]);

  return prisma.statement.update({
    where: { id: statementId },
    data: { countMinusVotes, countPlusVotes }
  });
};

const statementVote = async (params: StatementVoteParams) => {
  if (![-1, 1].includes(params.points)) throw new Error(`Invalid vote points`);

  const vote = await prisma.statementVote.upsert({
    create: {
      points: params.points,
      statement: { connect: { id: params.statementId } },
      user: { connect: { id: params.userId } }
    },
    update: { points: params.points },
    where: {
      userId_statementId: {
        userId: params.userId,
        statementId: params.statementId
      }
    }
  });

  return updateStatementCountVotes(vote.statementId);
};

export default statementVote;
