const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
    "busname":{type:String,required:true},
    "route":{type:String,required:true},
    "busno":{type:String,required:true},
    "dname":{type:String,required:true}
}
)
let ksrtcmodel = mongoose.model("busdetails",schema)
module.exports={ksrtcmodel}