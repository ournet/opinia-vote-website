import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { toIntOrNull } from "../../lib/utils";
import dataClient from "../../lib/data-client";
import StatementVoteForm from "../../components/StatementVoteForm";
import StatementListItem from "../../components/StatementListItem";
import { StatementCountsType, StatementItemType } from "../../lib/types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = toIntOrNull(params?.id);
  if (!id) return { notFound: true };
  const statement = await dataClient.statement.findById(id);

  if (!statement) return { notFound: true };

  return {
    props: {
      statement: JSON.parse(JSON.stringify(statement))
    }
  };
};

type Props = {
  statement: StatementItemType;
};

const Index: React.FC<Props> = ({ statement }) => {
  const [counts, setCounts] = useState<StatementCountsType>(statement);

  return (
    <Layout>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <StatementListItem item={{ ...statement, ...counts }} />
            <h4 className="p-6 text-center text-2xl">{statement.question}</h4>
            <StatementVoteForm
              statement={statement}
              onNewCounts={(data) => setCounts(data)}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
