import { useSWRInfinite } from "swr";
import links, { ApiGetStatementListParams } from "../links";
import { StatementItemType } from "../types";

const createKey = (page: number, params: ApiGetStatementListParams) =>
  links.api.statements.get({ ...params, offset: page * params.limit });

const useStatementList = (
  params: ApiGetStatementListParams,
  initialData: StatementItemType[]
) => {
  return useSWRInfinite((page) => createKey(page, params), undefined, {
    initialData: [initialData],
    refreshInterval: 1000 * 60,
    initialSize: 1
  });
};

export default useStatementList;
