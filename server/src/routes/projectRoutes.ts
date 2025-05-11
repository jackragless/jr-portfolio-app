import express, { RequestHandler } from 'express';
import { getProjects } from '../controllers/projectController';

const router = express.Router();

// Cast the controller functions to RequestHandler to satisfy TypeScript
const getProjectsHandler = getProjects as RequestHandler;

// Route to get all projects
router.get('/', getProjectsHandler);

export default router;