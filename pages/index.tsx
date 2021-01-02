import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import StatementList from "../components/StatementList";
import { StatementListItemType } from "../components/StatementListItem";
import apiClient from "../lib/api-client";
import useTranslation from "../lib/locales/use-translation";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const statements = await apiClient.statement.list({
    where: {
      languageCode: locale || ""
    },
    take: 20,
    orderBy: { id: "desc" }
  });

  return {
    props: { statements: JSON.parse(JSON.stringify(statements)) }
  };
};

type Props = {
  statements: StatementListItemType[];
};

const Index: React.FC<Props> = ({ statements }) => {
  const t = useTranslation();
  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {t.statements()}
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
