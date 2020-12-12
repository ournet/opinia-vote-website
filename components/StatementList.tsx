import React from "react";
import StatementListItem, { StatementListItemType } from "./StatementListItem";

export type StatementListItemsProps = {
  items: StatementListItemType[];
};

const List: React.FC<StatementListItemsProps> = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <StatementListItem item={item} />
      </li>
    ))}
  </ul>
);

export default List;
