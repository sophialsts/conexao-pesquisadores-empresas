import { researcherWithIdAndName } from '@/selectors/researchers.selectors.js';
import { Prisma } from '@prisma/client';
import { evaluation_criterion_type } from '@prisma/client';

export type Researcher = Prisma.researchersGetPayload<{
  select: typeof researcherWithIdAndName;
}>;

export type RecommendationCriterion = {
    criterionName: string,
    value: number
}

export type RecommendedResearcher = {
    id: string,
    name: string,
    criteria: RecommendationCriterion[]
}

export type ResearcherSortBy = 'average' | evaluation_criterion_type;