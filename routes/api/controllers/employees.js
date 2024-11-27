import express from "express";
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { businessId, employeeId } = req.query;

    let query = {};

    // Filter employees by businessId or specific employeeId
    if (businessId) {
      query = { business: businessId };
    } else if (employeeId) {
      query = { _id: employeeId };
    }

    const employees = await req.models.Employee.find(query);

    if (!employees.length) {
      return res
        .status(404)
        .json({ status: "error", error: "No employees found" });
    }

    // Calculate earnings dynamically for each employee
    const employeeData = employees.map((employee) => ({
      id: employee._id,
      firstName: employee.firstName,
      secondName: employee.secondName,
      hoursWorked: employee.hoursWorked,
      hourlyWage: employee.hourlyWage,
      earnings: employee.hoursWorked * employee.hourlyWage,
    }));

    res.json({
      status: "success",
      employees: employeeData,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
