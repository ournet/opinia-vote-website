import { Enumerable, Prisma, XOR } from "@prisma/client";
import prisma from "./prisma";

export interface StatementsListParams {
  where: {
    languageCode: string;
  };
  take: number;
  skip?: number;
  orderBy: XOR<
    Enumerable<Prisma.StatementOrderByInput>,
    Prisma.StatementOrderByInput
  >;
}

const statementsList = ({ take, orderBy, where, skip }: StatementsListParams) =>
  prisma.statement.findMany({
    where,
    include: { author: true },
    take,
    orderBy,
    skip
  });

export default statementsList;
