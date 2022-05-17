const mongoose = require("mongoose");

mongoose.model("Category", {

    categoryNumber: {
        type: String,
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    numberofCategory: {
        type: Number,
        require: false
    }
});