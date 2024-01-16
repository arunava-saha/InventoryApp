const mongo = require("mongoose");
const Db = async (url) => await mongo.connect(url);
module.exports = Db;
