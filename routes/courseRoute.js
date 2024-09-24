import express from "express";
import multer from "multer";
import { addCourse, getCourses, deleteCourse } from "../controllers/courseController.js";

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
    cb(null, 'uploads/courseimages');
=======
    cb(null, "uploads/images/courseimages");
>>>>>>> a7239944ecd4b67ad2ae1bf322aa1f66e81ad003
  },
  filename: (req, file, cb) => {
    // const sanitizedFilename = sanitizeFilename(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Course Routes
router.get("/courses", getCourses);

// Handle file upload and any potential errors
router.post("/course", (req, res, next) => {
  upload.single('course_image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }
    addCourse(req, res); // Proceed with adding the course after upload
  }); 
});

// Delete a trainer by ID
router.delete('/course/:id', deleteCourse);

export default router;
