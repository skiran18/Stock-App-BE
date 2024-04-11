const { db_connection } = require('../utils/databaseCon');

const getStores = async (req, res) => {
  let stores =db_connection.collection("store").find()
  let storeNames = await stores.toArray()
  console.log(storeNames);
  res.status(200).send(JSON.stringify({storeDetails: storeNames}))
};

module.exports = {getStores};
