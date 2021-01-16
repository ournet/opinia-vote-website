import Link from "next/link";
import React from "react";
import links from "../../lib/links";
import { StatementCountsType, StatementItemType } from "../../lib/types";
import EntityImage from "../EntityImage";

export type StatementListItemProps = {
  item: StatementItemType;
  size?: "small" | "big";
};

const Counts: React.FC<StatementCountsType> = ({
  countMinusVotes,
  countPlusVotes
}) => (
  <div className="absolute bottom-4 right-4 text-white text-sm">
    <i className="pl-3 pr-3 bg-green-600 text-center inline-block rounded-full ml-4 w-8 h-8 align-middle">
      <i>{countPlusVotes}</i>
    </i>
    <i className="pl-3 pr-3 bg-red-600 inline-block">{countMinusVotes}</i>
  </div>
);

const Item: React.FC<StatementListItemProps> = ({ item }) => {
  return (
    <div className="relative rounded shadow bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 overflow-hidden text-white">
      <div className="float-left text-center p-4">
        <Link
          locale={item.languageCode}
          href={links.entity(item.author.slug, item.author.id)}
        >
          <a title={item.author.name}>
            <div style={{ maxWidth: "100px" }} className="block mx-auto p-3">
              <EntityImage entity={item.author} />
            </div>
            <p className="pt-2">{item.author.name}</p>
          </a>
        </Link>
      </div>
      <div className="block p-6 max-w-prose mx-auto">
        <Link locale={item.languageCode} href={links.statement(item.id)}>
          <a className="block">
            <h3 className="q-text text-xl">{item.text}</h3>
            {item.context && (
              <p className="italic mt-2 text-sm opacity-80">{item.context}</p>
            )}
          </a>
        </Link>
        <div className="text-sm mt-4">
          {item.entities.map((it) => (
            <Link
              locale={item.languageCode}
              href={links.entity(it.entity.slug, it.entityId)}
            >
              <a
                className="inline-block mr-2"
                title={it.entity.fullName || it.entity.name}
              >
                #{it.entity.abbr || it.entity.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <Counts {...item} />
    </div>
  );
};

export default Item;
