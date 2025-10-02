import { Prisma } from "@prisma/client";
export const researcherWithIdAndName = Prisma.validator<Prisma.researchersSelect>()({
  researcher_id: true,
  name: true,
});