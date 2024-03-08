const { MongoClient} = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_DB
const client = new MongoClient(uri);


let db_con = client.connect();
let db_connection = client.db("stockapp")


module.exports = {db_connection}
