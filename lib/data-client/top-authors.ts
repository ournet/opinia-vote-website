import { Entity } from "@prisma/client";
import { filterUndefined } from "../utils";
import prisma from "./prisma";

export interface TopAuthorsParams {
  where: {
    languageCode: string;
    countryCode?: string;
  };
  take: number;
  skip?: number;
}

export type TopAuthor = Entity & { total: number };

const topAuthors = async ({
  take,
  where,
  skip,
}: TopAuthorsParams): Promise<TopAuthor[]> => {
  const sql = `SELECT author_id as id, count(id) as total from statements
  where language_code=$1${where.countryCode ? ` and country_code = $4` : ""}
  group by author_id
  order by total desc limit $2 offset $3`;

  const rows = await prisma.$queryRaw<{ id: number; total: number }[]>(
    sql,
    ...filterUndefined([
      where.languageCode,
      take,
      skip || 0,
      where.countryCode || undefined,
    ])
  );
  const authors = await prisma.entity.findMany({
    where: { id: { in: rows.map((it) => it.id) } },
  });

  return authors.map((item) => ({
    ...rows.find((it) => it.id === item.id),
    ...item,
  })) as never;
};

export default topAuthors;
