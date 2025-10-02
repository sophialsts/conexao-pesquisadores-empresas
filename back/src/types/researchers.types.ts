import { researcherWithIdNameAbstractAndInstitution } from '@/selectors/researchers.selectors.js';
import { Prisma } from '@prisma/client';
import { evaluation_criterion_type } from '@prisma/client';

export type Researcher = Prisma.researchersGetPayload<{
  select: typeof researcherWithIdNameAbstractAndInstitution;
}>;

export type RecommendationCriterion = {
    criterionName: string,
    value: number
}

export type RecommendedResearcher = {
    id: string,
    name: string,
    abstract: string | null,
    instituicao: string | null,
    sigla: string | null
    criteria: RecommendationCriterion[],
    recommendationReason: string | null,
}

export type ResearcherSortBy = 'average' | evaluation_criterion_type;