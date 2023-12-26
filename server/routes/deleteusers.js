const express = require("express");
const router = express();
const User = require("../models/user");

router.post("/deleteUser", async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found.", status: 404 });
    }
    res.status(200).send({
      message: "User deleted successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Error during user deletion:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
