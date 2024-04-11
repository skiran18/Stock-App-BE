const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.secretKey;
const refreshSecretKey = process.env.refreshSecretKey;

let refreshTokensArr = [];
function reFreshToken(req, res) {
  try {
    const refreshToken  = req.body.refreshtoken;
    console.log(refreshTokensArr)
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokensArr.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
      if (err) {
        return res.status(403).send("Invalid refresh token");
      }
      const newToken = jwt.sign({ userId: decoded.userId }, secretKey, {
        expiresIn: "5m",
      });
      res.json({ token: newToken });
    });
  } catch (error) {
    res.status(500).send("Error refreshing token");
  }
}

function verifyToken(req, res, next) {
console.log(req.headers)
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.userId = decoded.userId;
    next();
  });
}

function login(user){
    const token = jwt.sign({ userId: user }, process.env.secretKey, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ userId: user}, process.env.refreshSecretKey, { expiresIn: '1d' });
    refreshTokensArr.push(refreshToken)
    return {token,refreshToken}
}

function logout(req,res){
    refreshTokensArr = refreshTokensArr.filter(token => token !== req.body.token)
    console.log(refreshTokensArr)
  res.sendStatus(204)
}

module.exports = { reFreshToken, verifyToken, login, logout };
