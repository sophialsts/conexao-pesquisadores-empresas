import { Prisma } from "@prisma/client";
export const researcherWithIdNameAbstractAndInstitution = Prisma.validator<Prisma.researchersSelect>()({
  researcher_id: true,
  name: true,
  abstract: true,
  sigla: true,
  instituicao: true
});

export const researcherWithIdNameAndInstitution = Prisma.validator<Prisma.researchersSelect>()({
  researcher_id: true,
  name: true,
  sigla: true,
  instituicao: true

});