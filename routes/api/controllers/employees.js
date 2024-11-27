import express from "express";
var router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    // Fetch all employees from the Employee collection
    console.log("Fetching all employees...");
    const employees = await req.models.Employee.find();

    if (!employees.length) {
      return res
        .status(404)
        .json({ status: "error", error: "No employees found" });
    }

    // Map and calculate earnings dynamically for each employee
    const employeeData = employees.map((employee) => ({
      id: employee._id,
      firstName: employee.firstName,
      secondName: employee.secondName,
      hoursWorked: employee.hoursWorked,
      hourlyWage: employee.hourlyWage,
      earnings: employee.hoursWorked * employee.hourlyWage,
    }));

    // Return the employee data
    res.json({
      status: "success",
      employees: employeeData,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const employeePost = new req.models.Employee({
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
      hourlyWage: Number(req.body.hourlyWage),
      hoursWorked: Number(req.body.hoursWorked),
      businessID: req.models.businessID
    })
    await employeePost.save()
    res.json({
      status: "success"
    })

  } catch (error) {
    console.log("Error saving employee: ", error)
    res.status(500).json({
      status: "error", 
      error: error.message
    })
  }
})

export default router;
