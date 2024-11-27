const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ "message": "Username & Password are required" });
  // duplicate
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create and store new user
    const result = await User.create({
      "username": user,
      "password": hashedPwd
    });
    console.log(result);
    res.status(200).json({ "success": `new user ${user} created!` });
  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
}

module.exports = { handleNewUser };