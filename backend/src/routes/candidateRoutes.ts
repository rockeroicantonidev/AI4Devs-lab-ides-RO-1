import express from 'express';
import { createCandidate } from '../controllers/candidateController';
import { validateCandidate } from '../validators/candidateValidator';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router.post(
  '/candidates',
  upload.single('resume_file'),
  validateCandidate,
  createCandidate
);

export default router;