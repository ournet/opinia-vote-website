import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import StatementList from "../components/StatementList";
import { StatementListItemType } from "../components/StatementListItem";
import { BaseComponentProps } from "../components/common";

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  const statements = await prisma.statement.findMany({
    where: {
      languageCode: "ro"
    },
    include: {
      author: true
    },
    take: 20,
    orderBy: { id: "desc" }
  });
  return {
    props: { statements: JSON.parse(JSON.stringify(statements)), lang: locale }
  };
};

interface Props extends BaseComponentProps {
  statements: StatementListItemType[];
}

const Index: React.FC<Props> = ({ statements, lang }) => {
  return (
    <Layout lang={lang}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Declaratii
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <StatementList items={statements} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
