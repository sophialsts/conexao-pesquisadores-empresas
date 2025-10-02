import { Router } from 'express';
import companiesRouter from './companies.routes.js'
import researchersRouter from './researchers.routes.js'

const router = Router();
router.use('/companies', companiesRouter)
router.use('/researchers', researchersRouter)

export default router;

