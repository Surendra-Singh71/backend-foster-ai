// import express from "express";
// import multer from "multer";
// import { addTrainer, getTrainers } from "../controllers/trainerController.js";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// // Define __filename and __dirname for ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure upload directory exists
// const ensureDir = (dir) => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// };

// // Sanitize file name
// const sanitizeFilename = (filename) => {
//     return filename.replace(/[^a-z0-9\.\-]/gi, '_').toLowerCase();
// };

// // Multer setup for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, '..', 'uploads', 'trainerimages');
//         ensureDir(uploadDir);  // Ensure directory exists
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const sanitizedFilename = sanitizeFilename(file.originalname);
//         cb(null, Date.now() + "-" + sanitizedFilename);
//     },
// });

// const upload = multer({ storage });

// const router = express.Router();

// // Trainer Routes
// router.get("/trainers", getTrainers);
// // Handle file upload and any potential errors
// router.post("/trainer", (req, res, next) => {
//     upload.single('trainer_image')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ error: err.message });
//         } else if (err) {
//             return res.status(500).json({ error: 'File upload failed' });
//         }
//         addTrainer(req, res); // Proceed with adding the trainer after upload
//     });
// });

// export default router;





import express from "express";
import multer from "multer";
import { addTrainer, deleteTrainer, getTrainers } from "../controllers/trainerController.js";

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/trainerimages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const router = express.Router();

// Trainer Routes
router.get("/trainers", getTrainers);

// Handle file upload and any potential errors
router.post("/trainer", (req, res, next) => {
    upload.single('trainer_image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }
        addTrainer(req, res); // Proceed with adding the trainer after upload
    });
});

// Delete a trainer by ID
router.delete('/trainer/:id', deleteTrainer);

export default router;
