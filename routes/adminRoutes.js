const express = require('express');
const router = express.Router();
const Users = require("../models/users").model

router.post("/search", async (req, res) => {
  try {
    const { username } = req.body;

    // Use Mongoose's find method to search for users by username
    const user = await Users.find({ username });

    if (user.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
  