import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    trainer_name: {
      type: String,
      required: true,
    },
    trainer_image: {
      type: String,
      required: true,
    },
    trainer_description: {
      type: String,
      required: true,
    },
    trainer_linkedin_url: {
      type: String,
      required: false,
    },
    trainer_instagram_url: {
      type: String,
      required: false,
    },
    trainer_email: {
      type: String,
      required: true,
    },
    trainer_phone_number: {
      type: String,
      required: true,
    },
    trainer_expertise: {
      type: String,
      required: true,
    },
    trainer_experience: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
