const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const { busmodel } = require("./models/register")
const { ksrtcmodel} = require("./models/ksrtc")
const jwt = require("jsonwebtoken")


const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb+srv://Jafna02:jafna9074@cluster0.icijy.mongodb.net/RegisterDb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10)  //salt=cost factor value
    return bcrypt.hash(password,salt)
}

app.post("/signUp",async(req,res)=>{

    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)

    input.password = hashedPassword     //stored the hashed password to server
    let bus = new busmodel(input)
    bus.save()
    console.log(bus)

    res.json({"status":"success"})
})



app.post("/login",(req,res)=>{
    let input = req.body
    busmodel.find({"email":req.body.email}).then(
    (response)=>{
        if(response.length > 0){
            let dbPassword = response[0].password
            console.log(dbPassword)
            bcrypt.compare(input.password,dbPassword,(error,isMatch)=>{ //input pswd and hashed pswd is  compared
                if (isMatch) {
                    //if login success generate token
                    jwt.sign({email:input.email},"bus-app",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"unable to create token"})
                            } else {
                                res.json({"status":"success","userId":response[0]._id,"token":token})
                            }
                        }
                    )
                } else {
                    res.json({"status":"incorrect"})
                }
            })
            
        } else {
            res.json({"status":"user not found"})
        }
    }
    ).catch()
  
})

app.post("/view",(req,res)=>{
    let token = req.headers["token"]
    jwt.verify(token,"bus-app",(error,decoded)=>{
        if (error) {
            res.json({"status":"unauthorized access"})
        } else {
            if(decoded){
                busmodel.find().then(
                    (response)=>{
                        res.json(response)
                    }
                ).catch()
            }
            
        }
    }
)
})

app.post("/add",(req,res)=>{
    let input=req.body
    let ksrtc = new ksrtcmodel(input)
    ksrtc.save()
    console.log(ksrtc)
    res.json({"status":"success"})
})

app.post("/viewall",(req,res)=>{
    ksrtcmodel.find().then(
        (data)=>{
            res.json(data)
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
})

app.post("/searchksrtc",(req,res)=>{
    let input = req.body
    ksrtcmodel.find(input).then(
        (data)=>{
            res.json(data)
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )

})


app.listen(8080,(req,res)=>{
    console.log("server started")
})
