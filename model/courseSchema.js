import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 

const courseSchema = new mongoose.Schema(
  {
    course_ID: {
      type: String,
      default: uuidv4,  // Automatically generate a UUID for each course
      unique: true,     // Ensure it's unique
    },
    course_name: {
      type: String,
      required: true,
    },
    course_image: {
      type: String, // Store the image path or URL
      required: false,
    },
    course_description: {
      type: String,
      required: true,
    },
    course_duration: {
      type: Number, // Storing duration as days or hours
      required: true,
    },
    course_price: {
      type: Number, 
      required: false,
    },
    course_start_date: {
      type: Date,
      required: true,
    },
    course_category: {
      type: String,
      required: true,
    },
    course_status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
