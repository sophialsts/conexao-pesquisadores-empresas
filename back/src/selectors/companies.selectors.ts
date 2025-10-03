import { Prisma } from "@prisma/client";
export const companyWithIdAndName = Prisma.validator<Prisma.companiesSelect>()({
  id: true,
  name: true,
});
