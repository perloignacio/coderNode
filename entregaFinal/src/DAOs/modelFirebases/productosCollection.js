const db=require("./connection");
const collection = db.collection("productos")
module.exports=collection; 