const { db_connection } = require('../utils/databaseCon');

const getCategories = async (req, res) => {
  let categories =db_connection.collection("category").find()
  categories = await categories.toArray()
  console.log(categories);
  res.send(JSON.stringify({storeCategories: categories}))
};


const getStoreCategories = async (req, res) => {
    db_connection
      .collection("category")
      .findOne({ storeCode: req.params.storecode })
      .then((obj) => {
        console.log(obj);
        res.send(JSON.stringify({categoryStoreWise: obj }));
      });
  };

module.exports = {getCategories, getStoreCategories};