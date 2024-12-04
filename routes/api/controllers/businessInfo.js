import express from "express";
var router = express.Router();

// GET current business information
router.get("/", async (req, res) => {
  try {
    if (!req.session.isAuthenticated) {
      res.status(401).json({
        status: "error",
        error: "not logged in",
      });
      return;
    }

    const businessID = req.query.businessID;
    const businesses = await req.models.Business.findById(businessID);

    res.json(businesses);
  } catch (error) {
    console.error("Error fetching business names:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/addEarnings", async (req, res) => {
  // console.log("request body", req.body);
  try {
    const { businessID, earningsToAdd } = req.body;
    if (!businessID || earningsToAdd == null) {
      return res.status(400).json({ status: 'error', error: 'Missing data' });
    }

    const business = await req.models.Business.findById(businessID);

    business.earnings = (business.earnings || 0) + Number(earningsToAdd);

    await business.save();
    // console.log("saved to database")
    return res.json({
      status: "Success"
    })

  } catch (error) {
    console.log("Error adding earnings to business");
    return res.status(500).json({ status: 'error', error: error });
  }
})


router.delete("/", async (req, res) => {
  console.log("request body", req.body);
  try {
    const { businessID } = req.body;

    if (!req.session.isAuthenticated) {
      return res.status(401).json({
        status: "error",
        error: "not logged in"
      });
    }

    await req.models.Employee.deleteMany({businessID: businessID})
    const deleteResult = await req.models.Business.deleteOne({ _id: businessID})

    console.log(`successfully deleted business with ID: ${businessID}`);

    return res.json({
      status: "Success"
    })

  } catch (error) {
    console.log("error deleting business:", error)
    return res.status(500).json({
      status: "error",
      error: error
    })
  }
})

export default router;
