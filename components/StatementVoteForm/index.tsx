import { signIn, useSession } from "next-auth/client";
import React, { useState } from "react";
import useStatementCounts from "../../lib/api-client/use-statement-counts";
import links from "../../lib/links";
import useTranslation from "../../lib/locales/use-translation";
import { StatementCountsType } from "../../lib/types";

type Props = {
  statement: StatementCountsType;
  onNewCounts?: (counts: StatementCountsType) => void;
};

const StatementVoteForm: React.FC<Props> = ({ statement, onNewCounts }) => {
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  const statementId = statement.id;
  const { data, mutate } = useStatementCounts(statementId, statement);
  const t = useTranslation();

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
    if (onNewCounts) onNewCounts(result);
  };

  const btnClass = `inline-flex items-center btn ${
    loading ? "cursor-default" : null
  }`;

  return (
    <div className={loading ? "animate-pulse" : ""}>
      <div className="flex flex-wrap -m-4">
        <div className="p-4 w-1/2 flex justify-around">
          <button
            className={`${btnClass} btn-success`}
            disabled={loading || !data}
            data-points="1"
            onClick={(e) => vote(e)}
          >
            {t.yes()}
          </button>
        </div>
        <div className="p-4 w-1/2 flex justify-around">
          <button
            className={`${btnClass} btn-danger`}
            disabled={loading || !data}
            data-points="-1"
            onClick={(e) => vote(e)}
          >
            {t.no()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatementVoteForm;
