export type Company = {
  id: string, 
  name: string
};

export type RecommendedCompany = {
  id: string,
  name: string,
  area: string | null,
  recommendationReason: string | null
}