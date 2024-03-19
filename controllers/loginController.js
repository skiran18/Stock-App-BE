const bcrypt = require('bcrypt');
const { db_connection } = require('../utils/databaseCon');

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

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {checkUser};
