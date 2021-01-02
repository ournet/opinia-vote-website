import React from "react";
import useStatementList, {
  ApiGetStatementListParams,
  ApiStatementItem
} from "../lib/api-client/use-statement-list";
import StatementList from "./StatementList";

export type MoreStatementListItemsProps = {
  initialData: ApiStatementItem[];
  params: ApiGetStatementListParams;
};

const MoreStatementList: React.FC<MoreStatementListItemsProps> = ({
  initialData,
  params
}) => {
  const { data, error, mutate, size, setSize, isValidating } = useStatementList(
    params,
    initialData
  );

  console.log(`data`, data, error, size, isValidating);

  const items = (data
    ? [].concat(...(data as never[]))
    : []) as ApiStatementItem[];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < params.limit);
  // const isRefreshing = isValidating && data && data.length === size;

  return (
    <>
      <StatementList items={items} />
      {!isReachingEnd && !error && (
        <div>
          <button disabled={isLoadingMore} onClick={() => setSize(size + 1)}>
            {isLoadingMore ? "loading..." : "load more"}
          </button>
        </div>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default MoreStatementList;
