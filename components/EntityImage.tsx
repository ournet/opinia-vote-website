import React from "react";
import { Entity } from "@prisma/client";
import entipicUrl from "../lib/entipicUrl";

type Props = { entity: Entity };

const EntityImage: React.FC<Props> = ({ entity }) => {
  return (
    <img
      className="w-full object-cover rounded-full ring"
      src={entipicUrl(entity.name, {
        size: "b",
        lang: entity.languageCode
      })}
      alt={entity.name}
    />
  );
};

export default EntityImage;
