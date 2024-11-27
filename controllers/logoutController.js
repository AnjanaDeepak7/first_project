const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;
  // is refresh token in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204); //no content
  };
  // delete refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204); //no content
}

module.exports = { handleLogout }