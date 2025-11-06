import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { listCafes, createCafe, updateCafe, removeCafe } from '../controllers/cafes.controller';

const router = Router();

const uploadDir = process.env.UPLOAD_DIR || './data';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.get('/', listCafes);
router.post('/', upload.single('logo'), createCafe);
router.put('/:id', upload.single('logo'), updateCafe);
router.delete('/:id', removeCafe);

export default router;
