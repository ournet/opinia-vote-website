import { Entity, Statement } from "@prisma/client";

export type StatementItemType = Statement & { author: Entity };

export type StatementCountsType = Pick<
  Statement,
  "countMinusVotes" | "countPlusVotes" | "id"
>;
