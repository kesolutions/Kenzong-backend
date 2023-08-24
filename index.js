const express = require("express")
//引入
var mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1/jobster");
//监听
mongoose.connection.once("open",function(){
  console.log("数据库连接成功！！");
});

//断开：mongoose.disconnect();

//为了省事赋予一个变量
var Schema = mongoose.Schema;

//创建Schema对象(定义规则)
var userSchema = new Schema({
  username:String,
  password:String
});

//创建Model
//mongoose.model(modelName, schema)
var userModel = mongoose.model("users",userSchema)

//向数据库插入文档，见下面具体操作
//userModel.create(doc,function(err){})

const app = express()
app.use(express.json())

 //设置响应头 为了解决跨域问题
app.use((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-type")
  next() //放行
})

//用户查询
app.post("/admin/users", (req, res)=>{
  const {username} = req.body
  console.log("收到查询请求")
  res.send({
      status: 'ok', 
      data: userModel.find({username:username}, function(err,docs){
        if(!err){
          console.log(docs);
        }
      })
  })
})


//用户注册
app.post("/users/register", (req,res)=>{
  //获取用户输入的用户名和密码
  const {username, password} = req.body
  //验证用户名和密码
  if(username === /^[a-zA-Z0-9]{5,11}$/ && password === /^(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/){

      //添加进数据库
      userModel.create({
        username: username,
        password: password
      },function(err){
        if(!err){
          console.log("插入成功!")
        }
      });

      //注册成功
      res.send({
          status: "ok",
          data:{id:"12345", username:"admin", nickname:"超级管理员"}
      })
  }
  else{
      //注册失败
      res.status(403).send({
          status:"error",
          data:"用户名或密码不符合要求"
      })
  }
})


//用户登录
app.post("/users/login", (req,res)=>{
  //获取用户输入的用户名和密码
  const {username, password} = req.body
  //验证用户名和密码(admin,123123需要替换)
  if(username === admin && password === "123123"){
      //登录成功
      res.send({
          status: "ok",
          data:{id:"12345", username:username}
      })
  }
  else{
      //登录失败
      res.status(403).send({
          status:"error",
          data:"用户名或密码错误"
      })
  }
})

//用户密码修改
app.post("/users/changepassword", (req,res)=>{
  //获取用户输入的用户名和密码和新密码
  const {username, password, newpassword} = req.body
  //验证用户名和密码(admin,123123需要替换)
  if(username === admin && password === "123123"){
      //成功
      userModel.updateOne({username:username},{$set:{password:newpassword}},function(err){
        if(!err){
          console.log("修改成功!")
        }
      })
      res.send({
          status: "ok",
          data:{id:"12345", username:username}
      })
  }
  else{
      //失败
      res.status(403).send({
          status:"error",
          data:"用户名或密码错误"
      })
  }
})

//注销账户
app.delete("/users/:id",(req,res)=>{

  const {username, password} = req.body
  userModel.remove({username:username}, function(err){
    if(!err){
      console.log("删除成功");
    }
  })

  res.send({
    status: "ok"
  })
})

//服务器启动监听
app.listen(3000, ()=>{
  console.log("服务器已经启动！")
})