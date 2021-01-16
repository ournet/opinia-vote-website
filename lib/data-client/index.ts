import prisma from "./prisma";
import statementVote from "./statement-vote";
import statementsList from "./statements-list";

const statementById = (id: number) =>
  prisma.statement.findUnique({
    where: { id },
    include: { author: true, entities: { include: { entity: true } } }
  });

const statementCounts = (id: number) =>
  prisma.statement.findUnique({
    where: { id },
    select: { countMinusVotes: true, id: true, countPlusVotes: true }
  });

const userByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export default {
  statement: {
    vote: statementVote,
    findById: statementById,
    list: statementsList,
    counts: statementCounts
  },
  user: {
    byEmail: userByEmail
  }
};
