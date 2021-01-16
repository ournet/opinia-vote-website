import { Entity, Statement, StatementEntity } from "@prisma/client";

export type StatementItemType = Statement & {
  author: Entity;
  entities: (StatementEntity & { entity: Entity })[];
};

export type StatementCountsType = Pick<
  Statement,
  "countMinusVotes" | "countPlusVotes" | "id"
>;
