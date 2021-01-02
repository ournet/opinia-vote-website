import { Entity, Statement } from "@prisma/client";
import { useSWRInfinite } from "swr";

export type ApiStatementItem = Statement & { author: Entity };

export interface ApiGetStatementListParams {
  orderBy: string;
  languageCode: string;
  limit: number;
  offset?: number;
}

const createKey = (
  index: number,
  url: string,
  params: ApiGetStatementListParams
) => [url, { ...params, offset: index * params.limit }];

const fetchData = async (...arg: any[]): Promise<ApiStatementItem[]> => {
  console.log(arg);
  return [];
  // return fetch({ url, method: "GET" }).then((response) => response.json());
};

const useStatementList = (
  params: ApiGetStatementListParams,
  initialData: ApiStatementItem[]
) => {
  const url = `/api/statements`;
  return useSWRInfinite((index) => createKey(index, url, params), fetchData, {
    initialData: [initialData]
  });
};

export default useStatementList;
