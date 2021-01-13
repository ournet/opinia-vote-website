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
      <div className="rounded shadow bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 overflow-hidden text-white">
        <div className="float-left text-center p-4">
          <Link
            locale={item.languageCode}
            href={links.entity(item.author.slug, item.author.id)}
          >
            <a title={item.author.name}>
              <div style={{ maxWidth: "100px" }} className="block mx-auto p-3">
                <EntityImage entity={item.author} />
              </div>
              <p className="text-lg pt-2">{item.author.name}</p>
            </a>
          </Link>
        </div>
        <div className="p-6 max-w-prose mx-auto">
          <blockquote className="q-text text-xl">{item.text}</blockquote>
        </div>
      </div>
    </div>
  );
};

export default Item;
