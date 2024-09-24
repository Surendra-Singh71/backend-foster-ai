// import mongoose from 'mongoose';

// const traineeSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },
//     gender: { type: String, required: true },
//     emailAddress: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true, unique: true },
//     address: { type: String, required: true },
//     educationLevel: { type: String, required: true },
//     collageName: { type: String, required: true },
//     coursesInterested: { type: [String], required: true },
//     applyDate: { type: Date, default: Date.now },
//     password: { type: String }
// });

// export default mongoose.model("Trainee", traineeSchema);





import mongoose from 'mongoose';

const traineeInternSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  educationLevel: { type: String, required: true },
  collageName: { type: String, required: true },
  coursesInterested: { type: [String], required: true },

  // Admin fields
  photo: { type: String },
  CertificateNumber: { type: String },
  StartDate: { type: Date },
  EndDate: { type: Date },
  FatherName: { type: String },
  InternsTechnology: { type: String },

  // Role
  role: {
    type: String,
    required: true,
    enum: ['Intern', 'Admin'],
  },

  // Common fields
  applyDate: { type: Date, default: Date.now },
  password: { type: String }
});

// Prevent model overwrite during hot-reload
export default mongoose.models.TraineeIntern || mongoose.model("TraineeIntern", traineeInternSchema);
