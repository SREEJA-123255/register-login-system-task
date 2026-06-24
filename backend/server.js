const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "login.html"));
});

mongoose.connect("mongodb+srv://sreeja2005:sreeja2005@cluster0.vtya4nj.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected");
})
.catch(() => {
    console.log("MongoDB Error");
});



const User = mongoose.model("User", {

    name: String,
    email: String,
    mobile: String,
    password: String

});

app.post("/register", async (req,res)=>{

    const data = req.body;


    const hashPassword = await bcrypt.hash(
        data.password,
        10
    );


    const user = new User({

        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: hashPassword

    });


    await user.save();


    res.json({
        message:"Registration Successful"
    });

});



app.post("/login", async(req,res)=>{


    const user = await User.findOne({

        email:req.body.email

    });



    if(user){

        const checkPassword =
        await bcrypt.compare(
            req.body.password,
            user.password
        );


        if(checkPassword){

            res.json({
                message:"Login Successful"
            });

        }
        else{

            res.json({
                message:"User does not exist, please register"
            });

        }

    }
    else{

        res.json({
            message:"Invalid credentials"
        });

    }

});


app.listen(5000,()=>{

    console.log("Server running on port 5000");

});