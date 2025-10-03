import { Prisma } from '@prisma/client';
import { companyWithIdAndName } from '@/selectors/companies.selectors.js';

export type Company = Prisma.companiesGetPayload<{
  select: typeof companyWithIdAndName;
}>;

export type RecommendedCompany = {
  id: string,
  name: string,
  area: string | null,
  recommendationReason: string | null
}