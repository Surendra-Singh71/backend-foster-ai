import mongoose from 'mongoose';

const traineeInternSchema = new mongoose.Schema({
  // Trainee-filled data
  fullName: { type: String, required: function() { return this.role === 'trainee'; } },
  dateOfBirth: { type: Date, required: function() { return this.role === 'trainee'; } },
  gender: { type: String, required: function() { return this.role === 'trainee'; } },
  emailAddress: { type: String, required: function() { return this.role === 'trainee'; }, unique: true },
  phoneNumber: { type: String, required: function() { return this.role === 'trainee'; }, unique: true },
  address: { type: String, required: function() { return this.role === 'trainee'; } },
  educationLevel: { type: String, required: function() { return this.role === 'trainee'; } },
  collageName: { type: String, required: function() { return this.role === 'trainee'; } },
  coursesInterested: { type: [String], required: function() { return this.role === 'trainee'; } },

  // Admin-filled data
  photo: { type: String, required: function() { return this.role === 'admin'; } },
  CertificateNumber: { type: String, required: function() { return this.role === 'admin'; } },
  StartDate: { type: Date, required: function() { return this.role === 'admin'; } },
  EndDate: { type: Date, required: function() { return this.role === 'admin'; } },
  FatherName: { type: String, required: function() { return this.role === 'admin'; } },
  InternsTechnology: { type: String, required: function() { return this.role === 'admin'; } },

  // Role field to distinguish between trainee and admin data
  role: {
    type: String,
    required: true,
    enum: ['trainee', 'admin'], // Only allow 'trainee' or 'admin' as values
  },

  // Common fields
  applyDate: { type: Date, default: Date.now },
  password: { type: String } // Assuming this is only relevant for trainees
});

export default mongoose.model("TraineeIntern", traineeInternSchema);
