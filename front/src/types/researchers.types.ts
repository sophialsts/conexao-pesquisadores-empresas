export type Researcher = {
  id: string,
  name: string
  sigla: string,
  instituicao: string
};

export type ResearcherWithAbstract = {
  id: string,
  name: string
  sigla: string,
  instituicao: string
};

export type RecommendationCriterion = {
    criterionName: string,
    value: number
}

export type RecommendedResearcher = {
    id: string,
    name: string,
    sigla: string,
    instituicao: string
    criteria: RecommendationCriterion[],
    recommendationReason: string
}

export type ResearcherSortBy = 
  'flexibilidade' | 
  'areaEstudo' |
  'experienciaAcademica';