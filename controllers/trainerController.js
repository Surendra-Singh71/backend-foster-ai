// import Trainer from "../model/trainerSchema.js";

// // Get all trainers
// export const getTrainers = async (req, res) => {
//   try {
//     const trainers = await Trainer.find();
//     res.status(200).json({ trainers });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch trainers", error });
//   }
// };

// // Add a new trainer
// export const addTrainer = async (req, res) => {
//   try {
//     const newTrainer = new Trainer(req.body);
//     const savedTrainer = await newTrainer.save();
//     res
//       .status(201)
//       .json({ message: "Trainer added successfully", trainer: savedTrainer });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add trainer", error });
//   }
// };





import Trainer from '../model/trainerSchema.js';

// Get all trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.status(200).json({ trainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Failed to fetch trainers", error });
  }
};

// Add a new trainer
export const addTrainer = async (req, res) => {
  try {
    const {
      trainer_name,
      trainer_description,
      trainer_linkedin_url,
      trainer_instagram_url,
      trainer_email,
      trainer_phone_number,
      trainer_expertise,
      trainer_experience
    } = req.body;

    // Validate required fields
    if (!trainer_name || !trainer_description || !trainer_email || !trainer_phone_number || !trainer_expertise || !trainer_experience) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trainer_email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(trainer_phone_number)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Validate experience (must be a positive number)
    if (isNaN(trainer_experience) || trainer_experience <= 0) {
      return res.status(400).json({ message: "Invalid experience value" });
    }

    // Check if an image is uploaded
    const trainer_image = req.file ? req.file.path : null;

    // Create new trainer object
    const newTrainerData = {
      trainer_name,
      trainer_description,
      trainer_image,  // Save the image path
      trainer_linkedin_url,
      trainer_instagram_url,
      trainer_email,
      trainer_phone_number,
      trainer_expertise,
      trainer_experience,
    };

    // Save new trainer to the database
    const newTrainer = new Trainer(newTrainerData);
    const savedTrainer = await newTrainer.save();

    res.status(201).json({ message: "Trainer added successfully", trainer: savedTrainer });
  } catch (error) {
    console.error("Error adding trainer:", error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation failed", error });
    }

    // Handle unexpected errors
    res.status(500).json({ message: "Failed to add trainer", error });
  }
};

// Delete Trainer data from the list
export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrainer = await Trainer.findByIdAndDelete(id);

    if (!deletedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting Trainer:', error);
    res.status(500).json({ message: 'Failed to delete Trainer', error });
  }
};
