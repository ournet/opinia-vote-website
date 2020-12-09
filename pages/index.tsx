import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Statement } from "@prisma/client";

export const getServerSideProps: GetStaticProps = async () => {
  const statements = await prisma.statement.findMany({
    where: {
      languageCode: "ro"
    },
    include: {
      author: true
    }
  });
  return {
    props: { statements: JSON.parse(JSON.stringify(statements)) }
  };
};

type Props = {
  statements: Statement[];
};

const Index: React.FC<Props> = ({ statements }) => {
  return (
    <Layout>
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
            {statements.map((statement) => (
              <div key={statement.id} className="post">
                <a href={`/p/${statement.id}`}>Title</a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
