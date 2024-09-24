import mongoose from 'mongoose';
import Course from '../model/courseSchema.js';

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_description,
      course_duration,
      course_price,
      course_start_date,
      course_category,
      course_status
    } = req.body;

    // Validate required fields
    if (!course_name || !course_description || !course_duration) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Validate course_price (ensure it's a valid positive number)
    if (isNaN(course_price) || course_price <= 0) {
      return res.status(400).json({ message: "Invalid course price" });
    }

    // Validate course_start_date (ensure it's a valid date)
    if (isNaN(Date.parse(course_start_date))) {
      return res.status(400).json({ message: "Invalid course start date" });
    }

    // Create a new course object
    const newCourseData = {
      course_name,
      course_description,
      course_image: req.file ? req.file.path : "",  // Handle image upload (optional)
      course_duration,
      course_price,
      course_start_date,
      course_category,
      course_status: course_status === 'active' ? true : false,  // Convert status
    };

    // Save new course to the database
    const newCourse = new Course(newCourseData);
    const savedCourse = await newCourse.save();

    res.status(201).json({ message: "Course added successfully", course: savedCourse });
  } catch (error) {
    console.error("Error adding course:", error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation failed", error });
    }

    // Handle other unexpected errors
    res.status(500).json({ message: "Failed to add course", error });
  }
};

// Delete Course data from the list
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting Course:', error);
    res.status(500).json({ message: 'Failed to delete Course', error });
  }
};