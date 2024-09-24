// import express from 'express';
// import multer from 'multer'
// const router = express.Router();
// import { adminSideData, getAdminsideData, getTraineeById, getTraineeData, login, registerTrainee } from '../controllers/traineeController.js'


// // Multer setup for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.post('/interns', upload.single('photo'), adminSideData);

// router.post('/register', registerTrainee);
// router.post('/login', login);
// router.get('/trainee', getTraineeData);
// router.get('/trainee/:id', getTraineeById);
// router.post('/admin', upload.single('photo'), adminSideData);
// // router.put('/admin/trainee/:id', upload.single('photo'), updateTrainee);
// router.get('/admin', getAdminsideData);




// export default router;






import express from 'express';
import multer from 'multer';
const router = express.Router();

import {
  adminSideData,
  getAdminsideData,
  getTraineeById,
  getTraineeData,
  login,
  registerTrainee,
  updateTrainee,
  deleteTrainee,
  // addTraineeByAdmin,
  // editTraineeByAdmin
} from '../controllers/traineeController.js';

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes

// Trainee Registration
router.post('/register', registerTrainee);

// Trainee Login
router.post('/login', login);

// Get All Trainees
router.get('/trainee', getTraineeData);

// Get Trainee by ID
router.get('/trainee/:id', getTraineeById);

// Admin-specific routes
// Admin adds a new trainee
// router.post('/admin/add', addTraineeByAdmin);

// Admin edits an existing trainee
// router.put('/admin/edit/:id', editTraineeByAdmin);


// Create or update intern data (Admin side)
router.post('/admin/interns', upload.single('photo'), adminSideData);

// Update a trainee's profile (Admin side)
router.put('/trainee/:id', upload.single('photo'), updateTrainee);

// Delete a trainee by ID
router.delete('/trainee/:id', deleteTrainee);
// Get all admin data
router.get('/admin', getAdminsideData);


export default router;
