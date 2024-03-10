const { db_connection } = require('../utils/databaseCon');

const getCategories = async (req, res) => {
  let categories =db_connection.collection("category").find()
  categories = await categories.toArray()
  console.log(categories);
  res.send(JSON.stringify({storeCategories: categories}))
};

module.exports = {getCategories};