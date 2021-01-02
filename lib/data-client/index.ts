import prisma from "./prisma";
import statementVote from "./statement-vote";
import statementsList from "./statements-list";

const statementById = (id: number) =>
  prisma.statement.findUnique({ where: { id }, include: { author: true } });

export default {
  statement: {
    vote: statementVote,
    findById: statementById,
    list: statementsList
  }
};
