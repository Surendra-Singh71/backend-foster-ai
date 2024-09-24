import express from "express";
const router = express.Router();

// Define your routes here
router.post("/contact", (req, res) => {
  // Your POST logic for creating a contact
  res.send("Contact created!");
});

router.get("/contacts", (req, res) => {
  // Your GET logic for fetching contacts
  res.send("Contacts fetched!");
});

// Export the router as the default export
export default router;
