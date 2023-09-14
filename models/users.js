const mongoose = require("mongoose");

//为了省事赋予一个变量 
const Schema = mongoose.Schema;

//创建Schema对象
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
});

//创建Model
//mongoose.model(modelName, schema)
const UserModel = mongoose.model("users", userSchema);

//向数据库插入文档，见下面具体操作
//userModel.create(doc,function(err){})

exports.model = UserModel;