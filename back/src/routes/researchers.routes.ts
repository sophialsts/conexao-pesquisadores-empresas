import { Router } from 'express';
import { getResearcherById, getResearchers, getRecommendedCompaniesForResearcher } from '@/controllers/researchers.controllers.js'
const router = Router();

router.get("/", getResearchers);
router.get("/:id", getResearcherById);
router.get("/:id/companies", getRecommendedCompaniesForResearcher);

export default router;

