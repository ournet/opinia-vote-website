import { Entity } from "@prisma/client";
import React from "react";
import EntityListItem from "../EntityListItem";

export type EntityListItemsProps = {
  items: Entity[];
};

const List: React.FC<EntityListItemsProps> = ({ items }) => (
  <ul className="grid grid-cols-3 gap-4">
    {items.map((item) => (
      <li key={item.id}>
        <EntityListItem item={item} />
      </li>
    ))}
  </ul>
);

export default List;
