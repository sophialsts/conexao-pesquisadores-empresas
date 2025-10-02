import prisma from "@/config/prismaClient.js"
import { getEmbedding } from "@/utils/index.js";
import { researcherWithIdAndName } from "@/selectors/researchers.selectors.js";
import { RecommendedResearcher, Researcher, ResearcherSortBy } from "@/types/researchers.types.js";
import { Prisma } from "@prisma/client";

const getResearchers = async (limit:number = 10): Promise<Researcher[]> => {
    return prisma.researchers.findMany({
        take: limit,
        select: researcherWithIdAndName
    });
}

const getResearchersBySimilarity = async (
  searchText: string,
  limit: number = 10
): Promise<Researcher[]> => {
  
  if (!searchText?.trim()) {
    return [];
  }
  
  const processedQuery = searchText
    .trim()
    .split(/\s+/)
    .join(' & ') + ':*';

  const results = await prisma.$queryRaw<Researcher[]>`
    SELECT
      researcher_id,
      name
    FROM
      researchers,
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

const getResearcherById = async (id:string): Promise<Researcher|null> => {
      return await prisma.researchers.findUnique({
        where: {
           researcher_id: id, 
        },
        select: researcherWithIdAndName
    });
}

async function getRecommendedResearchersForCompany(
  companyId: string, sortBy: ResearcherSortBy = 'average'
): Promise<RecommendedResearcher[]> {

  let orderByClause: Prisma.Sql;

  switch (sortBy) {
    case 'research_alignment':
      orderByClause = Prisma.sql`ORDER BY MAX(CASE WHEN eval.criterion_name = 'research_alignment' THEN eval.criterion_value END) DESC NULLS LAST`;
      break;
    case 'innovation_potential':
      orderByClause = Prisma.sql`ORDER BY MAX(CASE WHEN eval.criterion_name = 'innovation_potential' THEN eval.criterion_value END) DESC NULLS LAST`;
      break;
    case 'cultural_fit':
      orderByClause = Prisma.sql`ORDER BY MAX(CASE WHEN eval.criterion_name = 'cultural_fit' THEN eval.criterion_value END) DESC NULLS LAST`;
      break;
    case 'relevant_experience':
      orderByClause = Prisma.sql`ORDER BY MAX(CASE WHEN eval.criterion_name = 'relevant_experience' THEN eval.criterion_value END) DESC NULLS LAST`;
      break;
    case 'average':
    default:
      orderByClause = Prisma.sql`ORDER BY AVG(eval.criterion_value) DESC NULLS LAST`;
      break;
  }
  
  const baseQuery = Prisma.sql`
    SELECT
      eval.researcher_id AS id,
      r.name AS name,
      jsonb_agg(
        jsonb_build_object(
          'criterionName', eval.criterion_name,
          'value', eval.criterion_value
        )
      ) AS criteria,
      MAX(eval.recommendation_reason) as "recommendationReason"
      
    FROM
      researcher_evaluations_by_company AS eval
    JOIN
      researchers AS r ON eval.researcher_id = r.researcher_id
    WHERE
      eval.company_id = ${companyId}::uuid
    GROUP BY
      eval.researcher_id, r.name
  `;

  const finalQuery = Prisma.sql`${baseQuery} ${orderByClause}`;

  const results = await prisma.$queryRaw<RecommendedResearcher[]>(finalQuery);

  return results;
}

export { getResearchers, getResearchersBySimilarity, getResearcherById, getRecommendedResearchersForCompany };