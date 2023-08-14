const express=require("express");
const flightRouter=express.Router();
const {FlightModel}=require("../model/flight.model");

flightRouter.get("/flights",async(req,res)=>{
    try {
        const flights=await FlightModel.find()
        res.status(200).send(flights)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

flightRouter.get("/flights/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const flight=await FlightModel.findOne({_id:id})
        res.status(200).send(flight)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

flightRouter.post("/flights",async(req,res)=>{
    try {
        const flight=new FlightModel(req.body);
        await flight.save()
        res.status(201).send({msg:"Flight added successfully"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
flightRouter.put("/flights/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const flight = await FlightModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(204).send({ msg: "Flight updated successfully", flight });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

flightRouter.delete("/flights/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await FlightModel.findByIdAndDelete(id);
        res.status(204).send({ msg: "Flight deleted successfully"});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    
});

module.exports={flightRouter};