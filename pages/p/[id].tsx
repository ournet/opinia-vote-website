import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Statement } from "@prisma/client";
import { toIntOrNull } from "../../lib/utils";
import links from "../../lib/links";
import { BaseComponentProps } from "../../components/common";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale
}) => {
  const id = toIntOrNull(params?.id);
  let statement: null | Statement = null;

  if (id) {
    statement = await prisma.statement.findUnique({
      where: { id },
      include: { author: true }
    });
  }

  if (!statement) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      statement: JSON.parse(JSON.stringify(statement)),
      lang: locale
    }
  };
};

interface Props extends BaseComponentProps {
  statement: Statement;
}

const Index: React.FC<Props> = ({ statement, lang }) => {
  return (
    <Layout lang={lang}>
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
