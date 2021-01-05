import { Entity, Statement } from "@prisma/client";

export type StatementItemType = Statement & { author: Entity };
