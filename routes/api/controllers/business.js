import express from "express";
var router = express.Router();

// GET business names
router.get("/", async (req, res) => {
  try {
    if (!req.session.isAuthenticated) {
      res.status(401).json({
        status: "error",
        error: "not logged in",
      });
      return;
    }

    const username = req.session.account.username;
    const businesses = await req.models.Business.find({ username: username });

    console.log("Fetched business:", businesses);
    res.json(businesses);
  } catch (error) {
    console.error("Error fetching business names:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Entering /post");
    console.log("Received from req.body: ", req.body.businessName);

    if (!req.session.isAuthenticated) {
      res.status(401).json({
        status: "error",
        error: "not logged in",
      });
      return;
    }
    const newBusinessName = req.body.businessName;

    const newBusiness = new req.models.Business({
      businessName: newBusinessName,
      username: req.session.account.username,
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
