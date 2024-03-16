const { db_connection } = require("../utils/databaseCon");

const getCategories = async (req, res) => {
  let categories = db_connection.collection("category").find();
  categories = await categories.toArray();
  console.log(categories);
  res.send(JSON.stringify({ storeCategories: categories }));
};

const getStoreCategories = async (req, res) => {
  db_connection
    .collection("category")
    .findOne({ storeCode: req.params.storecode })
    .then((obj) => {
      console.log(obj);
      res.send(JSON.stringify({ categoryStoreWise: obj }));
    });
};

const addCategory = async (req, res) => {
  // req.body.newCategory = <new category string>
  // req.body.storecode = <store code>
  db_connection
    .collection("category")
    .findOne({ storeCode: req.body.storecode })
    .then((obj) => {
      let oldCategories = obj.categories;
      console.log(oldCategories);
      const filter = { storeCode: req.body.storecode };
      const updateCategory = {
        $push: {
          categories: req.body.newCategory,
        },
      };
      db_connection
        .collection("category")
        .updateOne(filter, updateCategory)
        .then((result) => {
            db_connection.collection("stock")
            .findOne({ storeCode: req.body.storecode })
            .then((storeobj) => {
              console.log(storeobj);
              let newcat = req.body.newCategory
            let inner_obj = {...storeobj.stock.categories,[newcat]:[]}
            const updateStock ={
                $set: { stock:
                    {categories: inner_obj}
            }}
          db_connection
            .collection("stock")
            .findOneAndUpdate(filter,updateStock)
            .then((res2)=>{
                console.log(res2);
                res.send(JSON.stringify({ updatedCategory: res2 }));
            })
            });
            
        });
    });
};

module.exports = { getCategories, getStoreCategories, addCategory };
