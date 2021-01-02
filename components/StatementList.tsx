import React from "react";
import StatementListItem, { StatementListItemType } from "./StatementListItem";

export type StatementListItemsProps = {
  items: StatementListItemType[];
};

const StatementList: React.FC<StatementListItemsProps> = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <StatementListItem item={item} />
      </li>
    ))}
  </ul>
);

export default StatementList;
