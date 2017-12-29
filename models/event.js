const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = Schema({

    members:{
        type:[{ type: String }]
    },


    place:{
        type:String
    },

    group:{
      type:String
    },

    subject:{
        type:String
    },

    date:{
        type:String
    },

    sms:{
        type:Boolean
    }

});


const Event = mongoose.model("Event", EventSchema);
module.exports = Event;