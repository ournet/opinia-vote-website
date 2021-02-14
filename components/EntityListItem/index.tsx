import { Entity } from "@prisma/client";
import Link from "next/link";
import React from "react";
import links from "../../lib/links";
import EntityImage from "../EntityImage";

export type EntityListItemProps = {
  item: Entity;
  size?: "small" | "big";
};

const Item: React.FC<EntityListItemProps> = ({ item }) => {
  return (
    <Link locale={item.languageCode} href={links.entity(item.slug, item.id)}>
      <a title={item.name} className="flex">
        <div style={{ maxWidth: "100px" }} className="p-3 flex-1">
          <EntityImage entity={item} />
        </div>
        <p className="pt-6 flex-2">
          <h4 className="h4">{item.name}</h4>
        </p>
      </a>
    </Link>
  );
};

export default Item;
