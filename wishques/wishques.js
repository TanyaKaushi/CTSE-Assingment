//Load express
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

//Load mongoose
const mongoose = require("mongoose");

require("./Wishque")
const Wishque = mongoose.model("Wishque")

//Connect
mongoose.connect("mongodb+srv://tanya:tanya123@wishqueservice.v1qf9.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database is connected");
});

app.get('/',(req,res) => {
    res.send("This is wishque service");
})

//create function
app.post("/wishque", (req,res) => {
    var newWishque = {
        wishqueItemName: req.body.wishqueItemName,
        wishqueItemCategory: req.body.wishqueItemCategory,
        wishqueItemPrice: req.body.wishqueItemPrice
    }

    //create a new wishque item
    var wishque = new Wishque(newWishque)

    wishque.save().then(() => {
        console.log("New wishque created")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
    res.send("A new wishque created with success");

})

app.get("/wishques", (req,res) => {
    Wishque.find().then((wishques) => {
        res.json(wishques)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.get("/wishque/:id", (req,res) => {
    Wishque.findById(req.params.id).then((wishque) => {
        if(wishque){
            res.json(wishque)
        }else{
            res.sendStatus(404); 
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.delete("/wishque/:id", (req, res) => {
    Wishque.findOneAndRemove(req.params.id).then(() => {
        res.send("wishque removed with success")
    }).catch(err => {
        if(err){
            throw err
        }
    })
})

app.listen(5002, () => {
    console.log("Up and running");
})