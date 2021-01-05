import React from "react";
import { StatementItemType } from "../lib/types";
import StatementListItem from "./StatementListItem";

export type StatementListItemsProps = {
  items: StatementItemType[];
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
