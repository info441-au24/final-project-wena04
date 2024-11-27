import express from "express";
var router = express.Router();

// GET all employee information
router.get("/", async (req, res) => {
  try {
    const employees = await req.models.Employee.find();
    console.log("Fetced employees:", employees);

    res.json(employees);
  } catch (error) {
    console.log(req.user.username);
    console.error("Error fetching employees:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
