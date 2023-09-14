const express = require('express');
const Users = require("../models/users").model;
const router = express.Router();

//为什么这里不用写/user/register 而是 /register?
//为什么不用原来的app.post而是router.post
router.post("/register", (req,res)=>{
    //获取用户输入的用户名和密码
    const {username, password} = req.body
    //验证用户名和密码
    const usernameRegex = /^[a-zA-Z0-9]{5,11}$/;
    const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/
    if(usernameRegex.test(username) && passwordRegex.test(password)){
        //添加进数据库
        Users.create({
          username: username,
          password: password
        }).then((result)=>{
          res.send({msg:"已添加进数据库"})
        })
        .catch((err)=>{
          res.send({msg:"出现未知错误"})
        })
    }
    else{
      //不符合要求
      res.status(403).send({
          status:"error",
          msg:"用户名或密码不符合要求"
      })
    }
  })
  
  
//用户登录
router.post("/login", (req,res)=>{
  //获取用户输入的用户名和密码
  const {username, password} = req.body
  //验证用户名和密码(admin,123123需要替换)
  Users.findOne({username:username, password:password})
  .then((docs)=>{
    if(docs == null){
      console.log("用户名或密码错误");
    }
    else{
      console.log("成功登录", docs);
    }
  })
  .catch((err)=>{
    console.log(err);
  });
})

//用户密码修改
router.post("/changepassword", async (req,res)=>{
  //获取用户输入的用户名和密码和新密码
  try{
    const {username, password, newpassword} = req.body
    //验证用户名和密码(admin,123123需要替换)
    const user = await Users.findOne({username:username, password:password});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.password = newpassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  
  
module.exports = router;
