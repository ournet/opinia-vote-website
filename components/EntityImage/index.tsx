import React from "react";
import { Entity } from "@prisma/client";
import entipicUrl from "../../lib/entipicUrl";

type Props = { entity: Entity; size?: "a" | "b" | "c" | "d" };

const EntityImage: React.FC<Props> = ({ entity, size }) => {
  return (
    <img
      className="w-full object-cover rounded-full ring"
      src={entipicUrl(entity.name, {
        size: size || "b",
        lang: entity.languageCode
      })}
      alt={entity.name}
    />
  );
};

export default EntityImage;
