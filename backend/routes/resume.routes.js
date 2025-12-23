// routes/resumeRoutes.js
import express from 'express';
import multer from 'multer';
import { uploadResume, getResume } from '../controllers/resume.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/insert-resume', upload.single('resume'), uploadResume);
router.get('/get-resume', getResume);

export default router;