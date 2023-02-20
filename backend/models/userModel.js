const mongoose=require('mongoose');

const usersSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true,'please add a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please add a password']
    },
    // phoneNumber:{
    //     type:Number,
    //     required:[true,'please add a phone number']
    // },

},
{
    timestamps:true
})

module.exports=mongoose.model('User',usersSchema)