const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
    },
    mail:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 40
    },
    secret:{
        type: String,
        required: true,
        select: false,
        minLength: 5,
        maxLength: 100
    },
    options:{
        type: Object
    },
    assigned_user:{
        type: Array
    }
});

module.exports = mongoose.model("service", ServiceSchema);