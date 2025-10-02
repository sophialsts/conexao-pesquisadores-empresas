import prisma from "@/config/prismaClient.js"
import { getEmbedding } from "@/utils/index.js";
import { Company, RecommendedCompany } from "@/types/companies.types.js";
import { companyWithIdAndName } from '@/selectors/companies.selectors.js';

const getCompanies = async (limit:number=10): Promise<Company[]> => {
    return prisma.companies.findMany({
        take: limit,
        select: companyWithIdAndName
    });
}

const getCompaniesBySimilarity = async (
  searchText: string,
  limit: number = 10
): Promise<Company[]> => {
  if (!searchText?.trim()) {
    return [];
  }

  const processedQuery = searchText
    .trim()
    .split(/\s+/)
    .join(' & ') + ':*';

  const results = await prisma.$queryRaw<Company[]>`
    SELECT
      id,
      name
    FROM
      companies,
      to_tsquery('public.portuguese_unaccent', ${processedQuery}) query
    WHERE
      tsv @@ query
    ORDER BY
      ts_rank(tsv, query) DESC
    LIMIT
      ${limit};
  `;

  return results;
}

const getCompanyById = async (id:string): Promise<Company|null> => {
    return await prisma.companies.findUnique({
        where: {
           id: id, 
        },
        select: companyWithIdAndName
    });
}

async function getRecommendedCompaniesForResearcher(
  researcherId: string
): Promise<RecommendedCompany[]> {

  const recommendations = await prisma.company_recommendations_for_researchers.findMany({
    where: {
      researcher_id: researcherId,
    },

    select: {
      area: true,
      recommendation_reason: true,
      companies: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const recommendedCompanies: RecommendedCompany[] = recommendations.map((rec) => ({
    id: rec.companies.id,
    name: rec.companies.name,
    area: rec.area,
    recommendationReason: rec.recommendation_reason,
  }));

  return recommendedCompanies;
}

export { getCompanies, getCompaniesBySimilarity, getCompanyById, getRecommendedCompaniesForResearcher };