import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { Statement } from "@prisma/client";
import { toIntOrNull } from "../../lib/utils";
import links from "../../lib/links";
import dataClient from "../../lib/data-client";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = toIntOrNull(params?.id);
  if (!id) return { notFound: true };
  const statement = dataClient.statement.findById(id);

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
            <div key={statement.id} className="post">
              <a href={links.statement(statement.id)}>Title</a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
