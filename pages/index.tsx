import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { StatementListItemType } from "../components/StatementListItem";
import useTranslation from "../lib/locales/use-translation";
import dataClient from "../lib/data-client";
import MoreStatementList from "../components/MoreStatementList";
import { ApiGetStatementListParams } from "../lib/api-client/use-statement-list";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const languageCode = locale || "";

  const statements = await dataClient.statement.list({
    where: { languageCode },
    take: 1,
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
  const router = useRouter();
  const languageCode = router.locale || "";
  const t = useTranslation(languageCode);
  const params: ApiGetStatementListParams = {
    languageCode,
    limit: 1,
    orderBy: "id__desc"
  };

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
            <MoreStatementList initialData={statements} params={params} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
