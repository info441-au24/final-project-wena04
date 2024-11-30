import express from "express";
var router = express.Router();

// GET all employee information
router.get("/", async (req, res) => {
  try {
    const business = req.query.businessID;
    const employees = await req.models.Employee.find({
      businessID: business,
    });
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// POST a new employee
router.post("/", async (req, res) => {
  try {
    const employeePost = new req.models.Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hourlyWage: Number(req.body.hourlyWage),
      hoursWorked: Number(req.body.hoursWorked),
      businessID: req.body.businessID,
    });
    await employeePost.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log("Error saving employee: ", error);
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

export default router;
