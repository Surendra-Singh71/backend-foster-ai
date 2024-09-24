import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  CertificateNumber: { type: String, required: true },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date, required: true },
  FatherName: { type: String, required: true },
  InternsTechnology: { type: String, required: true },
});

export default mongoose.model("Trainee", internSchema);

