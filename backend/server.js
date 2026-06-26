require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(() => {
    console.log("MongoDB Error");
});



const User = require("./models/User");

app.post("/register", async (req,res)=>{

    const data = req.body;

    const existingUser = await User.findOne({ email: data.email });

    if(existingUser){
        return res.json({ message:"User already exists, please login" });
    }

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
        message:"Registration Successful Please Login"
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

         if (checkPassword) {

            res.json({
                message: "Login Successful"
            });

        } else {

            res.json({
                message: "Invalid Password"
            });

        }

    } else {

        res.json({
            message: "User not found. Please Register"
        });

    }

});



app.listen(5000,()=>{

    console.log("Server running on port 5000");

});