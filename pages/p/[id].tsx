import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { Statement } from "@prisma/client";
import { toIntOrNull } from "../../lib/utils";
import links from "../../lib/links";
import dataClient from "../../lib/data-client";
import StatementCountsForm from "../../components/StatementCountsForm";

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
  statement: Statement;
};

const Index: React.FC<Props> = ({ statement }) => {
  return (
    <Layout>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="post">
              <a href={links.statement(statement.id)}>Title</a>
            </div>
            <StatementCountsForm statement={statement} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
