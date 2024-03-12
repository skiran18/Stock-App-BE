const { db_connection } = require("../utils/databaseCon");

const getStock = async (req, res) => {
  let allStock = db_connection.collection("stock").find();
  stock = await allStock.toArray();
  console.log(stock);
  res.send(JSON.stringify({ stockStoreWise: stock }));
};

const getStoreStock = async (req, res) => {
  db_connection
    .collection("stock")
    .findOne({ storeCode: req.params.storecode })
    .then((obj) => {
      console.log(obj);
      res.send(JSON.stringify({ stockStoreWise: obj }));
    });
};

module.exports = { getStock, getStoreStock };
