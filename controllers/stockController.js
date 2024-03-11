const { db_connection } = require('../utils/databaseCon');

const getStock = async (req, res) => {
  let allStock =db_connection.collection("stock").find()
  stock = await allStock.toArray()
  console.log(stock);
  res.send(JSON.stringify({stockStoreWise: stock}))
};

module.exports = {getStock};