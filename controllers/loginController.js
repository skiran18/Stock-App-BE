const bcrypt = require('bcrypt');
const { db_connection } = require('../utils/databaseCon');
const { login, refreshToken } = require('../utils/auth');
require('dotenv').config()

const checkUser = async (req, res) => {

    const { username, password } = req.body;
  try {
    const user = await db_connection.collection("user").findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
   
    let login_res = login(username)
    let token = login_res.token
    let refreshToken=login_res.refreshToken
    let expiresIn = 300 // in secs
    res.status(200).json({ user, token, refreshToken, expiresIn});
    // res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {checkUser};
