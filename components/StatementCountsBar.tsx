import React from "react";
import { StatementCountsType } from "../lib/types";

type Props = Omit<StatementCountsType, "id">;

const StatementCountsBar: React.FC<Props> = ({
  countMinusVotes,
  countPlusVotes
}) => {
  return (
    <div className="flex flex-wrap -m-4">
      <div className="p-4 w-1/2">
        <h2>{countPlusVotes}</h2>
      </div>
      <div className="p-4 w-1/2">
        <h2>{countMinusVotes}</h2>
      </div>
    </div>
  );
};

export default StatementCountsBar;
