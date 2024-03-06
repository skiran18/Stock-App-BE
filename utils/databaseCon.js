const { MongoClient} = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_DB
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  let db = client.db("stockapp")
  let stores = db.collection('store').find()
  console.log(await stores.toArray())
}

run();
