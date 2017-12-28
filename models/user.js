const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({

    username:{
        type:String
    },

    email:{
        type:String
    },

    password:{
        type:String
    },

    session:{
      type:String
    },

    school:{
        type:Schema.Types.ObjectId,
        ref:'University'
    },

    gender:{
        type:'String'
    },

    event:{
        type:[{type: String, ref: 'Event'}]
    }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;