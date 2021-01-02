import { Entity, Statement } from "@prisma/client";
import { useSWRInfinite } from "swr";
import { buildUrl } from "../utils";

export type ApiStatementItem = Statement & { author: Entity };

export interface ApiGetStatementListParams {
  orderBy: string;
  languageCode: string;
  limit: number;
  offset?: number;
}

const createKey = (
  page: number,
  url: string,
  params: ApiGetStatementListParams
) => buildUrl(url, { ...params, offset: page * params.limit });

const useStatementList = (
  params: ApiGetStatementListParams,
  initialData: ApiStatementItem[]
) => {
  const url = `/api/statements`;
  return useSWRInfinite((page) => createKey(page, url, params), undefined, {
    initialData: [initialData],
    refreshInterval: 1000 * 60,
    initialSize: 1
  });
};

export default useStatementList;
