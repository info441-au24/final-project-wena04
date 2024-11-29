import express from "express";
var router = express.Router();

// GET all employee information
router.get("/", async (req, res) => {
  try {
    const business = req.query.businessID;
    console.log("Fetching employees for businessID: ", business);
    const employees = await req.models.Employee.find({ employees: business });
    console.log("Fetced employees:", employees);
    const allEmployees = await req.models.Employee.find();
    console.log("all employees: ", allEmployees);

    res.json(employees);
  } catch (error) {
    // console.log("username is: ", req.session.account.username);
    console.log("businessID is: ", req.query.businessID);
    // console.error("Error fetching employees:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

//FYI We are not including earnings as property of an employee. This will be handled in another api call
router.post("/", async (req, res) => {
  try {
    const employeePost = new req.models.Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hourlyWage: Number(req.body.hourlyWage),
      hoursWorked: Number(req.body.hoursWorked),
      businessID: req.models.businessID,
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
