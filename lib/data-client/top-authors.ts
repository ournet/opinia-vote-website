import prisma from "./prisma";

export interface TopAuthorsParams {
  where: {
    languageCode: string;
  };
  take: number;
  skip?: number;
}

const topAuthors = ({ take, where, skip }: TopAuthorsParams) =>
  prisma.statement.group({
    where,
    count: {},
    include: { author: true },
    take,
    skip,
    orderBy: {
      id: "asc"
    },
    distinct: "authorId"
  });

export default topAuthors;
