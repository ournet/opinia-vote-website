import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useStatementCounts from "../lib/api-client/use-statement-counts";
import links from "../lib/links";
import { StatementCountsType } from "../lib/types";

type Props = {
  statementId: number;
};

const StatementCountsForm: React.FC<Props> = ({ statementId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [session] = useSession();
  const { data, error, mutate } = useStatementCounts(statementId);

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
    mutate(result);
  };

  return (
    <div>
      <button
        disabled={loading || !data}
        data-points="-1"
        onClick={(e) => vote(e)}
      >
        Yes
      </button>
      votes {data?.countMinusVotes ?? "-"}
    </div>
  );
};

export default StatementCountsForm;
