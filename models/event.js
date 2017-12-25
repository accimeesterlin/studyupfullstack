const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = Schema({

    members:{
        type:String
    },


    location:{
        type:String
    }

});


module.exports = mongoose.model("Event", EventSchema);