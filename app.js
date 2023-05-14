const express = require('express');
const path = require("path");
const Subscriber = require("./src/models/subscribers");
const app = express();


//Routing all apis here

//When the server is loaded, an informatory page is shown to understand about the projet
//GET req to get the html file.
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});


//this api is getting all the data from mongodb.
//GET METHOD
app.get("/subscribers",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  }catch(error){
    res.status(400).send();
  }
})


//this api is only getting the subscribers name and Channel
//GET METHOD
app.get("/subscribers/names",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find({}).select("name subscribedChannel");
    res.status(200).send(subscribers);
  }catch(error){
    res.status(500);
  }
})


//this api is getting subscribers based on id provided in params
//GET METHOD
app.get("/subscribers/:id",async(req,res)=>{
  try{
    let subscribers = await Subscriber.findById(req.params.id);
    let count=0;

    if(subscribers)
    {
      if(Object.keys(subscribers).length==0)
      {
        console.log("not coming");
      res.sendFile(path.join(__dirname, "error.html"));
      }
      else{
        res.status(200).send(subscribers);
      count=1;
      console.log(count)
      }
      
    }
     
    
  }catch(error){
    res.status(400).send({message : error.message});
  }
})

module.exports = app;
