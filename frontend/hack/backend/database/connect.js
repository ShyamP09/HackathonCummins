const mongoose=require("mongoose");
const connection=async(req,res)=>
{
    try {
        mongoose.connect("mongodb+srv://shubhampatil942020:fdhe5VufSgTZQhHF@cluster0.jrqs3be.mongodb.net/")
        .then(console.log("db connected!"))
    } catch (error) {
        res.status(400).json({message:"not connected"});
        console.log("error in db connection")
    }
}
connection();