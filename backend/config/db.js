const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const { logger } = require('../functions/logger')

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(process.env.MONGURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true            
        });
        logger('Connection to DB established')
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = InitiateMongoServer; 