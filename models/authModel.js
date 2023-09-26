const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add the name"],
    },
    email:{
        type: String,
        required: [true, "Please add the email"],
    },
    password:{
        type: String,
        required: [true, "Please add the password"],
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Auth", authSchema)