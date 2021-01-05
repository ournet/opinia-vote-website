import useSWR from "swr";
import links from "../links";
import { StatementCountsType } from "../types";

const useStatementCounts = (statementId: number) => {
  return useSWR<StatementCountsType>(
    links.api.statements.counts(statementId),
    undefined,
    {
      refreshInterval: 1000 * 60
    }
  );
};

export default useStatementCounts;
