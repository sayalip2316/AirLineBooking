const express=require("express");
const {connection}=require("./config/db");
const dotenv=require("dotenv");
dotenv.config();
const {userRouter}=require("./routes/user.route");
const {flightRouter}=require("./routes/flight.routes");
const {bookingRouter}=require("./routes/booking.routes");
const {auth}=require("./middleware/auth.middleware");

const app=express();
app.use(express.json());
app.use("/api",userRouter);
app.use("/api",flightRouter);
app.use(auth);
app.use("/api",bookingRouter);



app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log("Connected to db")
        console.log(`Server is listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})
