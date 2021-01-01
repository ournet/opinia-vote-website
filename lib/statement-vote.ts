import prisma from "./prisma";

export interface StatementVoteParams {
  userId: number;
  statementId: number;
  points: number;
}

export default {
  vote: (params: StatementVoteParams) => {
    return prisma.statementVote.upsert({
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
  }
};
