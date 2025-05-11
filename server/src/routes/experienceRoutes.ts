import express, { RequestHandler } from 'express';
import { getExperiences } from '../controllers/experienceController';

const router = express.Router();

// Cast the controller function to RequestHandler to satisfy TypeScript
const getExperiencesHandler = getExperiences as RequestHandler;

// Route to get experience data
router.get('/', getExperiencesHandler);

export default router;