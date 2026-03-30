const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        
    }
},

{
    timestamps: true
}
)

module.exports = mongoose.model('Session', sessionSchema);
