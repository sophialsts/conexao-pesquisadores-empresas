import { Router } from 'express';
import { getCompanies, getCompanyById, getRecommendedResearchersForCompany } from '@/controllers/companies.controllers.js'
const router = Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.get("/:id/researchers", getRecommendedResearchersForCompany);

export default router;

