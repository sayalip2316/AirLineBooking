const express=require("express");
const bookingRouter=express.Router();
const {BookingModel}=require("../model/booking.model");
const {UserModel}=require("../model/user.model");
const {FlightModel}=require("../model/flight.model");

bookingRouter.post("/booking",async(req,res)=>{
    const{flight,userID}=req.body;
    try {
    const flightDet=await FlightModel.findOne({_id:flight});
    const user=await UserModel.findOne({_id:userID});
    
    const booking=new BookingModel({flight,userID})
    await booking.save();
    res.status(200).send({msg:"Booked"})
console.log(flightDet,user)
    } catch (error) {
        res.status(400).send({ error: error.message }); 
    }
   
})

bookingRouter.get("/dashboard",async(req,res)=>{
    try {
        const bookings = await BookingModel.find()
          .populate('user')
          .populate('flight');
    
        res.status(200).json({ bookings });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    })

bookingRouter.put("/dashboard/:id",async(req,res)=>{
    const {id}=req.params;
    const {updatedData}=req.body;
        try {
            const booking = await BookingModel.findByIdAndUpdate(id, updatedData, { new: true });
            res.status(204).send({msg:"Booking updated successfully"});
          } catch (error) {
            res.status(400).send({ error: error.message });
          }
        })

       bookingRouter.delete("/dashboard/:id",async(req,res)=>{
                const {id}=req.params;
                    try {
                        const book=await BookingModel.findOne({_id:id})
                        console.log(book)
                        const booking = await BookingModel.findByIdAndDelete({_id:id});
                        res.status(204).send({msg:"Booking Deleted successfully"});
                    } catch (error) {
                        res.status(400).send({ error: error.message });
                    }
                    })
        

module.exports={bookingRouter}