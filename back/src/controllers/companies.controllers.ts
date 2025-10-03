import { 
    getCompaniesBySimilarity, 
    getCompanies as getCompaniesService, 
    getCompanyById as getCompanyByIdService
} from "@/services/companies.services.js";
import { ResearcherSortBy } from "@/types/researchers.types.js";
import pkg from '@prisma/client';
const { evaluation_criterion_type } = pkg;
import { getRecommendedResearchersForCompany as getRecommendedResearchersForCompanyService } from "@/services/researchers.services.js";
import { 
    NextFunction, 
    Request, 
    Response 
} from "express";

const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
  const { search } = req.query;

  if (search !== undefined && typeof search !== 'string') {
    return res.status(400).json({
      message: "O parâmetro 'search' deve ser uma string."
    });
  }

  try {
    let companies;

    if (search) {
      companies = await getCompaniesBySimilarity(search);
    } else {
      companies = await getCompaniesService();
    }

    return res.json(companies);

  } catch (error) {
    next(error);
  }
}

const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const company = await getCompanyByIdService(id);
    res.json(company);
};

const allowedSortValues: string[] = ['average', ...Object.values(evaluation_criterion_type)];

export const getRecommendedResearchersForCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: companyId } = req.params;
    const { sort } = req.query;

    let sortBy: ResearcherSortBy = 'average';

    if (sort !== undefined) {
      if (typeof sort !== 'string') {
        return res.status(400).json({
          message: "O parâmetro 'sort' deve ser uma string."
        });
      }

      if (!allowedSortValues.includes(sort)) {
        return res.status(400).json({
          message: `Valor de ordenação inválido. Valores permitidos são: ${allowedSortValues.join(', ')}`
        });
      }


      sortBy = sort as ResearcherSortBy;
    }

    const researchers = await getRecommendedResearchersForCompanyService(companyId, sortBy);

    res.json(researchers);

  } catch (error) {
    next(error);
  }
};

export { getCompanies, getCompanyById }