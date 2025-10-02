export type Researcher = {
  id: string,
  name: string
};

export type RecommendationCriterion = {
    criterionName: string,
    value: number
}

export type RecommendedResearcher = {
    id: string,
    name: string,
    criteria: RecommendationCriterion[]
    recomendationReason: string | null
}

export type ResearcherSortBy = 
  'average' | 
  'research_alignment' |
  'innovation_potential' |
  'cultural_fit' |
  'relevant_experience';