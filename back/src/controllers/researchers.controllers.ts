import { 
  getResearchers as getResearchersService, 
  getResearcherById as getResearcherByIdService, 
  getResearchersBySimilarity as getResearchersBySimilarityService
} from "@/services/researchers.services.js";

import {getRecommendedCompaniesForResearcher as getRecommendedCompaniesForResearcherService} from '@/services/companies.services.js'

import { 
    NextFunction, 
    Request, 
    Response 
} from "express";

const getResearchers= async (req: Request, res: Response, next: NextFunction) => {
  const { search } = req.query;

  if (search !== undefined && typeof search !== 'string') {
    return res.status(400).json({
      message: "O parâmetro 'search' deve ser uma string."
    });
  }

  try {
    let researchers;

    if (search) {
      researchers = await getResearchersBySimilarityService(search);
    } else {
      researchers = await getResearchersService();
    }

    return res.json(researchers);

  } catch (error) {
    next(error);
  }
}

const getResearcherById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const researcher = await getResearcherByIdService(id);
    res.json(researcher);
};

const getRecommendedCompaniesForResearcher = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const companies = await getRecommendedCompaniesForResearcherService(id);
  res.json(companies);
}



export { getResearchers, getResearcherById, getRecommendedCompaniesForResearcher }