import { signIn, useSession } from "next-auth/client";
import React, { useState } from "react";
import useStatementCounts from "../lib/api-client/use-statement-counts";
import links from "../lib/links";
import { StatementCountsType } from "../lib/types";

type Props = {
  statement: StatementCountsType;
};

const StatementCountsForm: React.FC<Props> = ({ statement }) => {
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  const statementId = statement.id;
  const { data, error, mutate } = useStatementCounts(statementId, statement);

  const vote = async (e: any) => {
    if (!session) return signIn();
    const currentTarget = e.currentTarget;
    const points = currentTarget.dataset.points;
    setLoading(true);
    console.log(`vote`, points, loading, currentTarget);
    const result: StatementCountsType = await fetch(
      links.api.votes.post({ points, statementId }),
      { method: "POST" }
    ).then((r) => r.json());
    setLoading(false);
    mutate(result, false);
  };

  return (
    <div>
      <button
        disabled={loading || !data}
        data-points="1"
        onClick={(e) => vote(e)}
      >
        Yes
      </button>
      votes {data?.countPlusVotes ?? "..."}|{" "}
      <button
        disabled={loading || !data}
        data-points="-1"
        onClick={(e) => vote(e)}
      >
        No
      </button>
      votes {data?.countMinusVotes ?? "..."}
    </div>
  );
};

export default StatementCountsForm;
