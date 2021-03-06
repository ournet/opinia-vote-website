import useSWR from "swr";
import links from "../links";
import { StatementCountsType } from "../types";

const useStatementCounts = (
  statementId: number,
  initialData: StatementCountsType
) => {
  return useSWR<StatementCountsType>(
    links.api.statements.counts(statementId),
    undefined,
    {
      initialData,
      refreshInterval: 1000 * 60
    }
  );
};

export default useStatementCounts;
