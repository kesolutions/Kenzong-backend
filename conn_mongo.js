require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.once("open",function(){
  console.log("数据库连接成功！！");
});