import { Entity, Statement } from "@prisma/client";
import Link from "next/link";
import React from "react";
import entipicUrl from "../lib/entipicUrl";
import links from "../lib/links";

export type StatementListItemType = Statement & { author: Entity };

export type StatementListItemProps = {
  item: StatementListItemType;
};

const Item: React.FC<StatementListItemProps> = ({ item }) => (
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <Link href={links.statement(item.id)}>
      <a className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={entipicUrl(item.author.name, {
              size: "d",
              lang: item.author.languageCode
            })}
            alt={item.author.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {item.type}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {item.type}
          </a>
          <p className="mt-2 text-gray-500">{item.text}</p>
        </div>
      </a>
    </Link>
  </div>
);

export default Item;
