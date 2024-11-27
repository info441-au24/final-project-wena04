import express from "express";
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.session.isAuthenticated) {
      res.status(401).json({
          status: "error",
          error: "not logged in"
      })
      return 
    }

    const businesses = await req.models.Business.find({username: req.session.account.username});
    console.log("Fetched business:", businesses);

    res.json(businesses);
  } catch (error) {
    console.error("Error fetching business names:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// // GET all businesses
// router.get("/", async (req, res) => {
//   try {
//     const businesses = await req.models.Business.find().populate("employees");

//     console.log("Fetched all businesses:", businesses.length); // Debug log

//     const businessData = businesses.map((business) => ({
//       id: business._id,
//       businessName: business.businessName,
//       earnings: business.earnings,
//       employees: business.employees.map((employee) => ({
//         id: employee._id,
//         firstName: employee.firstName,
//         secondName: employee.secondName,
//         hoursWorked: employee.hoursWorked,
//         hourlyWage: employee.hourlyWage,
//         earnings: employee.earnings,
//       })),
//     }));

//     res.json(businessData);
//   } catch (error) {
//     console.error("Error fetching businesses:", error);
//     res.status(500).json({ status: "error", error: error.message });
//   }
// });

// // GET a specific business by ID
// router.get("/:businessId", async (req, res) => {
//   try {
//     const { businessId } = req.params;

//     const business = await req.models.Business.findById(businessId).populate(
//       "employees"
//     );

//     if (!business) {
//       return res
//         .status(404)
//         .json({ status: "error", error: "Business not found" });
//     }

//     console.log("Fetched business:", business.businessName); // Debug log

//     const businessData = {
//       id: business._id,
//       businessName: business.businessName,
//       earnings: business.earnings,
//       employees: business.employees.map((employee) => ({
//         id: employee._id,
//         firstName: employee.firstName,
//         secondName: employee.secondName,
//         hoursWorked: employee.hoursWorked,
//         hourlyWage: employee.hourlyWage,
//         earnings: employee.earnings,
//       })),
//     };

//     res.json(businessData);
//   } catch (error) {
//     console.error("Error fetching business by ID:", error);
//     res.status(500).json({ status: "error", error: error.message });
//   }
// });

// // GET businesses filtered by minimum earnings
// router.get("/filter/by-earnings", async (req, res) => {
//   try {
//     const { minEarnings } = req.query;

//     if (!minEarnings || isNaN(minEarnings)) {
//       return res
//         .status(400)
//         .json({ status: "error", error: "Invalid or missing minEarnings" });
//     }

//     const businesses = await req.models.Business.find({
//       earnings: { $gte: parseFloat(minEarnings) },
//     }).populate("employees");

//     console.log(
//       `Fetched businesses with earnings >= ${minEarnings}:`,
//       businesses.length
//     );

//     const businessData = businesses.map((business) => ({
//       id: business._id,
//       businessName: business.businessName,
//       earnings: business.earnings,
//       employees: business.employees.map((employee) => ({
//         id: employee._id,
//         firstName: employee.firstName,
//         secondName: employee.secondName,
//         hoursWorked: employee.hoursWorked,
//         hourlyWage: employee.hourlyWage,
//         earnings: employee.earnings,
//       })),
//     }));

//     res.json(businessData);
//   } catch (error) {
//     console.error("Error filtering businesses by earnings:", error);
//     res.status(500).json({ status: "error", error: error.message });
//   }
// });

// POST a new business
router.post("/", async (req, res) => {
  try {
    console.log("Entering /post");
    console.log("Received from req.body: ", req.body.businessName);

    if (!req.session.isAuthenticated) {
      res.status(401).json({
          status: "error",
          error: "not logged in"
      })
      return 
    }
    const newBusinessName = req.body.businessName;

    const newBusiness = new req.models.Business({
      businessName: newBusinessName,
      username: req.session.account.username
    });

    await newBusiness.save();
    console.log("successfully saved business into db");

    return res.json({ status: "success" });
  } catch (error) {
    console.log("Error saving new business: ", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
