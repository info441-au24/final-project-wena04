import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.isAuthenticated) {
    res.send(`Here is where I would put information about you
      with your name being: (${req.session.account.name})
      and your username being: ${req.session.account.username}`);
  } else {
    res.status(403).send("Error: You must be logged in");
  }
});

router.get("/", async (req, res) => {
  try {
    const allusers = await req.models.User.find();
    res.json(allusers);
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ status: "error" });
  }
});

router.post("/", async (req, res) => {
  try {
    let username = req.body.username;
    console.log("creating user " + username);

    let newUser = new req.models.User({
      username: username,
    });
    await newUser.save();

    res.json({ status: "success" });
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ status: "error" });
  }
});

export default router;
