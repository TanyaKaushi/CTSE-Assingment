//Load express
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

//Load mongoose
const mongoose = require("mongoose");

require("./Category")
const Category = mongoose.model("Category")

//Connect
mongoose.connect("mongodb+srv://tanya:tanya123@categoryservice.3knsp.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database is connected");
});

app.get('/',(req,res) => {
    res.send("This is category service");
})

//create function
app.post("/category", (req,res) => {
    var newCategory = {
        categoryNumber: req.body.categoryNumber,
        categoryName: req.body.categoryName,
        numberOfCategory: req.body.numberOfCategory
    }

    //create a new book 
    var category = new Category(newCategory)

    category.save().then(() => {
        console.log("New category created")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
    res.send("A new category created with success");

})

app.get("/categorys", (req,res) => {
    Category.find().then((categorys) => {
        res.json(categorys)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.get("/category/:id", (req,res) => {
    Category.findById(req.params.id).then((category) => {
        if(category){
            res.json(category)
        }else{
            res.sendStatus(404); 
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.delete("/category/:id", (req, res) => {
    Category.findOneAndRemove(req.params.id).then(() => {
        res.send("category removed with success")
    }).catch(err => {
        if(err){
            throw err
        }
    })
})

app.listen(5000, () => {
    console.log("Up and running");
})