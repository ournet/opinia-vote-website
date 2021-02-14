import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import useTranslation from "../lib/locales/use-translation";
import dataClient from "../lib/data-client";
import { useRouter } from "next/router";
import { TopAuthor } from "../lib/data-client/top-authors";
import EntityList from "../components/EntityList";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const languageCode = locale || "";

  const authors = await dataClient.topAuthors({
    where: { languageCode },
    take: 10,
  });

  return {
    props: { authors: JSON.parse(JSON.stringify(authors)) },
  };
};

type Props = {
  authors: TopAuthor[];
};

const Index: React.FC<Props> = ({ authors }) => {
  const router = useRouter();
  const languageCode = router.locale || "";
  const t = useTranslation(languageCode);

  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {t.top_authors()}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <EntityList items={authors} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
