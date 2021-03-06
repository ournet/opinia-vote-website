import React from "react";
import useStatementList from "../../lib/api-client/use-statement-list";
import { ApiGetStatementListParams } from "../../lib/links";
import useTranslation from "../../lib/locales/use-translation";
import { StatementItemType } from "../../lib/types";
import StatementList from "../StatementList";

export type MoreStatementListItemsProps = {
  initialData: StatementItemType[];
  params: ApiGetStatementListParams;
};

const MoreStatementList: React.FC<MoreStatementListItemsProps> = ({
  initialData,
  params
}) => {
  const t = useTranslation();
  const { data, error, size, setSize } = useStatementList(
    params,
    initialData
  );

  const items = (data
    ? [].concat(...(data as never[]))
    : []) as StatementItemType[];
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
        <div className="text-center mt-2">
          <button
            className="btn"
            disabled={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore ? t.loading_() : t.load_more()}
          </button>
        </div>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default MoreStatementList;
