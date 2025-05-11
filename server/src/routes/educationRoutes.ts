import express, { RequestHandler } from 'express';
import { getEducation } from '../controllers/educationController';

const router = express.Router();

// Cast the controller function to RequestHandler to satisfy TypeScript
const getEducationHandler = getEducation as RequestHandler;

// Route to get education data
router.get('/', getEducationHandler);

export default router;