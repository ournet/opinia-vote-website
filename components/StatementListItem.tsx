import Link from "next/link";
import React from "react";
import entipicUrl from "../lib/entipicUrl";
import links from "../lib/links";
import { StatementItemType } from "../lib/types";
import EntityImage from "./EntityImage";

export type StatementListItemProps = {
  item: StatementItemType;
};

const Item: React.FC<StatementListItemProps> = ({ item }) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="rounded shadow bg-blue-900 overflow-hidden text-white flex">
        <div className="flex-none w-32 p-4 text-center">
          <Link
            locale={item.languageCode}
            href={links.entity(item.author.slug, item.author.id)}
          >
            <a title={item.author.name} style={{maxWidth:"120px"}} className="block mx-auto p-2">
              <EntityImage entity={item.author} />
            </a>
          </Link>
          <p>{item.author.name}</p>
        </div>
        <div className="p-6">
          <blockquote>
            {item.text}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Item;
