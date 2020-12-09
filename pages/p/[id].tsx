import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Statement } from "@prisma/client";
import { toIntOrNull } from "../../lib/utils";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res
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
    res.statusCode = 404;
    res.setHeader("location", "/404");
  }

  return {
    props: {
      statement: statement ? JSON.parse(JSON.stringify(statement)) : null
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
              <a href={`/statement/${statement.id}`}>Title</a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
