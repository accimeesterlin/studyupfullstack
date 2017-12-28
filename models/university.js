const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UniversitySchema = Schema({

    university:{
        type:String
    },

    cohort:{
        type:String
    }
});


const User = mongoose.model('University', UniversitySchema);

module.exports = User;