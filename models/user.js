const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name:{type:String},
    gender:{type : String},
    dob:{type:String},
    howDidYouHearAboutUs :  {type : String},
    emailId : {type : String},
    password : {type : String},
    phoneNo :  {type : Number},
    countryCode : {type: Number},
    creditCardNo : {type :String}

})

module.exports = mongoose.model('User',UserSchema)

