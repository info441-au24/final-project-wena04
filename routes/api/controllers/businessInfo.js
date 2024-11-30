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


export default router;
