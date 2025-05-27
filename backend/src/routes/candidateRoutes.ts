import express from 'express';
import { createCandidate } from '../controllers/candidateController';
import { getAutocomplete } from '../controllers/autocompleteController';
import { validateCandidate } from '../validators/candidateValidator';
import { validateAutocomplete } from '../validators/autocompleteValidator';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router.post(
  '/candidates',
  upload.single('resume_file'),
  validateCandidate,
  createCandidate
);

router.get(
  '/candidates/autocomplete',
  validateAutocomplete,
  getAutocomplete
);

export default router;