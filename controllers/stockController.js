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

const addNewStock = async (req, res) => {
  // req.body.category = <category string>
  // req.body.storecode = <store code string>
  // req.body.categoryItem = <item object having "name", "count", and last updated">
  const category = req.body.category;
  console.log(category);
  const filter = { storeCode: req.body.storecode };
  const updateStock = {
    $push: {
      [`stock.categories.${category}`]: {
        ...req.body.categoryItem,
        lastUpdated: new Date(),
      },
    },
  };
  db_connection
    .collection("stock")
    .updateOne(filter, updateStock)
    .then((result) => {
      console.log(result);
      res.send(JSON.stringify(result));
    });
};


const addExistingStock = async (req, res) => {
    // req.body.category = <category string>
    //req.body.item = <category item>
    // req.body.storecode = <store code string>
    const category = req.body.category;
    const item = req.body.name;
    const newCount = req.body.newCount
    console.log(category, newCount);
    const filter = {'storeCode':req.body.storecode,[`stock.categories.${category}`]: {
        $elemMatch: {
          name: `${item}`
        }
      }};

      console.log(filter)
    const updateStock = {
      $set: {
        [`stock.categories.${category}.$.count`]: newCount,
        [`stock.categories.${category}.$.lastUpdated`]: new Date() 
      }
    };
    db_connection
      .collection("stock")
      .updateOne(filter, updateStock)
      .then((result) => {
        console.log(result);
        res.send(JSON.stringify(result));
      });
  };



module.exports = { getStock, getStoreStock, addNewStock, addExistingStock };
