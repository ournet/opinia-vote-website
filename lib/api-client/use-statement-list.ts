import { Entity, Statement } from "@prisma/client";
import { useSWRInfinite } from "swr";
import links from "../links";

export type ApiStatementItem = Statement & { author: Entity };

export interface ApiGetStatementListParams {
  orderBy: string;
  languageCode: string;
  limit: number;
  offset?: number;
}

const createKey = (page: number, params: ApiGetStatementListParams) =>
  links.api.statements.get({ ...params, offset: page * params.limit });

const useStatementList = (
  params: ApiGetStatementListParams,
  initialData: ApiStatementItem[]
) => {
  return useSWRInfinite((page) => createKey(page, params), undefined, {
    initialData: [initialData],
    refreshInterval: 1000 * 60,
    initialSize: 1
  });
};

export default useStatementList;
