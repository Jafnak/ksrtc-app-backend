const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "name":{type:String,required:true},
        "password":{type:String,required:true},
        "cpass":{type:String,required:true},
        "email":{type:String,required:true},
        "phno":{type:String,required:true},
        "gender":{type:String,required:true},
    }
)
let busmodel = mongoose.model("buses",schema)
module.exports={busmodel}