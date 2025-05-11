import express, { RequestHandler } from 'express';
import { getTechnologies } from '../controllers/technologyController';

const router = express.Router();

// Cast the controller function to RequestHandler to satisfy TypeScript
const getTechnologiesHandler = getTechnologies as RequestHandler;

// Route to get technology data
router.get('/', getTechnologiesHandler);

export default router;