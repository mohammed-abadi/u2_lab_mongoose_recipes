const bcrypt = require("bcrypt")

const User = require("../models/User.js")

const registerUser = async (req, res) => {
  try {
    const userInDatabase = await User.exists({ email: req.body.email })
    if (userInDatabase) {
      return res.send("❌ Username already taken!")
      // This can be an EJS page later...
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("❌ Password and Confirm Password must match")
      // This can also be an EJS page...
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      first: req.body.first,
      last: req.body.last,
      picture: req.body.picture,
    })
    res.send(`🙏 Thanks for signing up!`)
    // This can be an EJS page later...
  } catch (error) {
    console.error("⚠️ An error has occurred registering a user!", error.message)
  }
}
const signInUser = async (req, res) => {
  try {
  } catch (error) {}
}

module.exports = {
  registerUser,
}
