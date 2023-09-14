//新
require("./conn_mongo");
//断开：mongoose.disconnect();

const express = require("express")
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");
  next();
});

// Import route files
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use route files
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

//服务器启动监听
app.listen(3000, ()=>{
  console.log("服务器已经启动！")
})

//created_at   updated_at  deleted_at
