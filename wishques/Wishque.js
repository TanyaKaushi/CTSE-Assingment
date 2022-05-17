const mongoose = require("mongoose");

mongoose.model("Wishque", {

    wishqueItemName: {
        type: String,
        require: true
    },
    wishqueItemCategory: {
        type: String,
        require: true
    },
    wishqueItemPrice: {
        type: Number,
        require: false
    }
});