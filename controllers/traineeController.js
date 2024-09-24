// import Trainee from "../model/trainee.js";
// import Intern from "../model/admin.js";
// import { generatePassword } from "../utils/generatePassword.js";
// import { authenticate } from '../middleware/auth.js'


// export const registerTrainee = async (req, res) => {
//   try {
//     console.log('Headers:', req.headers);
//     console.log('req.body', req.body);

//     const { fullName, dateOfBirth, gender, emailAddress, phoneNumber, address, educationLevel, collageName, coursesInterested } = req.body;

//     if (!fullName || !dateOfBirth || !gender || !emailAddress || !phoneNumber || !address || !educationLevel || !collageName) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const password = await generatePassword();

//     const newTrainee = new Trainee({
//       fullName,
//       dateOfBirth,
//       gender,
//       emailAddress,
//       phoneNumber,
//       address,
//       educationLevel,
//       collageName,
//       coursesInterested,
//       password
//     });

//     await newTrainee.save();
//     res.status(201).json({ message: 'Trainee registered successfully', trainee: newTrainee });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error registering trainee', error });
//   }
// };


// export const login = async (req, res) => {
//   try {
//     const { identifier, password } = req.body;

//     const trainee = await authenticate(identifier, password);

//     if (!trainee) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', trainee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error during login', error });
//   }
// };

// //get all trainee 
// export const getTraineeData = async (req, res) => {
//   try {
//     const trainee = await Trainee.find();

//     if (!trainee) {
//       return res.status(401).json({ message: 'No trainee found' });
//     }

//     res.status(200).json({ trainee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error during fetching data', error });
//   }
// };


// //get single trainee by id
// export const getTraineeById = async (req, res) => {
//   try {

//     const trainee = await Trainee.findById(req.params.id);

//     if (!trainee) {
//       return res.status(401).json({ message: 'No trainee found by this Id' });
//     }

//     res.status(200).json({ trainee });
//   } catch (error) {
//     res.status(500).json({ message: 'Error during fetching data', error });
//   }
// };


// //data from admin side
// export const adminSideData = async (req, res) => {
//   try {
//     const { CertificateNumber, StartDate, EndDate, FatherName, InternsTechnology } = req.body;

//     const photo = req.file ? req.file.path : null;

//     const newIntern = new Intern({
//       photo,
//       CertificateNumber,
//       StartDate,
//       EndDate,
//       FatherName,
//       InternsTechnology
//     });

//     await newIntern.save();
//     res.status(201).json({ message: 'Intern record created successfully', data: newIntern });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };



// //get all intern data 
// export const getAdminsideData = async (req, res) => {
//   try {
//     const interns = await Intern.find();
//     res.status(200).json({ data: interns });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };










import TraineeIntern from "../model/traineeIntern.js";
import { generatePassword } from "../utils/generatePassword.js";
import { authenticate } from '../middleware/auth.js';

export const registerTrainee = async (req, res) => {
  try {
    // console.log('Headers:', req.headers);
    console.log('req.body', req.body);

    const {
      fullName,
      dateOfBirth,
      gender,
      emailAddress,
      phoneNumber,
      address,
      educationLevel,
      collageName,
      coursesInterested
    } = req.body;


    if (!fullName || !dateOfBirth || !gender || !emailAddress || !phoneNumber || !address || !educationLevel || !collageName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Determine the role based on the route
    const role = req.path.includes('Admin') ? 'Admin' : 'Intern';

    const password = await generatePassword();

    const newTrainee = new TraineeIntern({
      fullName,
      dateOfBirth,
      gender,
      emailAddress,
      phoneNumber,
      address,
      educationLevel,
      collageName,
      coursesInterested,
      password,
      role // Explicitly set the role
    });

    await newTrainee.save();

    const trainees = await TraineeIntern.find().sort({ applyDate: -1 }).exec();

    res.status(201).json({ message: 'Trainee registered successfully', trainee: newTrainee, trainees: trainees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error registering trainee', error });
  }
};


// // Admin adds a new trainee
// export const addTraineeByAdmin = async (req, res) => {
//   try {
//     console.log('req.body', req.body);
//     const {
//       fullName,
//       dateOfBirth,
//       gender,
//       emailAddress,
//       phoneNumber,
//       address,
//       educationLevel,
//       collageName,
//       coursesInterested,
//       photo,
//       CertificateNumber,
//       StartDate,
//       EndDate,
//       FatherName,
//       InternsTechnology,
//     } = req.body;

//     if (!fullName || !dateOfBirth || !gender || !emailAddress || !phoneNumber || !address || !educationLevel || !collageName) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const role = 'Admin';
//     const password = await generatePassword();

//     const newTrainee = new TraineeIntern({
//       fullName,
//       dateOfBirth,
//       gender,
//       emailAddress,
//       phoneNumber,
//       address,
//       educationLevel,
//       collageName,
//       coursesInterested,
//       photo,
//       CertificateNumber,
//       StartDate,
//       EndDate,
//       FatherName,
//       InternsTechnology,
//       password,
//       role
//     });

//     await newTrainee.save();
//     res.status(201).json({ message: 'Trainee added successfully', trainee: newTrainee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error adding trainee', error });
//   }
// };

// // Admin edits an existing trainee's details
// export const editTraineeByAdmin = async (req, res) => {
//   try {
//     const traineeId = req.params.id;
//     const updateData = req.body;

//     const updatedTrainee = await TraineeIntern.findByIdAndUpdate(traineeId, updateData, { new: true });

//     if (!updatedTrainee) {
//       return res.status(404).json({ message: 'Trainee not found' });
//     }

//     res.status(200).json({ message: 'Trainee updated successfully', trainee: updatedTrainee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating trainee', error });
//   }
// };

// Get all trainees
export const getTraineeData = async (req, res) => {
  try {
    // Fetch all records from the TraineeIntern collection
    const trainees = await TraineeIntern.find();
    res.status(200).json({ trainees });
  } catch (error) {
    console.error('Error fetching trainee data:', error);
    res.status(500).json({ message: 'Failed to fetch trainees', error });
  }
};

// Update Trainee data by admin
export const updateTrainee = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    console.log("Update request received for ID:", id);
    console.log("Data received:", updatedData);

    // If there's a file upload (like a photo), handle it
    if (req.file) {
      console.log("File received:", req.file);
      updatedData.photo = req.file.path;
    }

    // Find the trainee by ID and update their data
    const updatedTrainee = await TraineeIntern.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedTrainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    res.status(200).json({ message: 'Trainee updated successfully', trainee: updatedTrainee });
  } catch (error) {
    console.error('Error updating trainee:', error);
    res.status(500).json({ message: 'Failed to update trainee', error });
  }
};

// Delete Trainee data from the list
export const deleteTrainee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrainee = await TraineeIntern.findByIdAndDelete(id);

    if (!deletedTrainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    res.status(200).json({ message: 'Trainee deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainee:', error);
    res.status(500).json({ message: 'Failed to delete trainee', error });
  }
};


// Get single trainee by ID
export const getTraineeById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainee = await TraineeIntern.findById(id);

    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    res.status(200).json({ trainee });
  } catch (error) {
    console.error('Error fetching trainee by ID:', error);
    res.status(500).json({ message: 'Error fetching trainee by ID', error });
  }
};

// Admin side data submission
export const adminSideData = async (req, res) => {
  try {
    const { traineeId, CertificateNumber, StartDate, EndDate, FatherName, InternsTechnology } = req.body;

    const photo = req.file ? req.file.path : null;

    const trainee = await TraineeIntern.findById(traineeId);

    if (!trainee !== 'trainee') {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    trainee.photo = photo;
    trainee.CertificateNumber = CertificateNumber;
    trainee.StartDate = StartDate;
    trainee.EndDate = EndDate;
    trainee.FatherName = FatherName;
    trainee.InternsTechnology = InternsTechnology;
    trainee.role = 'Admin'; // Update role to admin

    await trainee.save();
    res.status(201).json({ message: 'Intern record updated successfully', data: trainee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating intern data', error });
  }
};

// Get all admin data
export const getAdminsideData = async (req, res) => {
  try {
    const admins = await TraineeIntern.find({ role: 'Admin' });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: 'No admin data found' });
    }

    res.status(200).json({ data: admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin data', error });
  }
};


// login
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const trainee = await authenticate(identifier, password);

    if (!trainee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', trainee });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};
