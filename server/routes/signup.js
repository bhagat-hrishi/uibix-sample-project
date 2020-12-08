const express = require('express');
const router = express.Router()

const User = require('../models/user')


router.get('/',(req,res)=>{
    res.send('hello from signup get')
})



// To Do SignUp Operation
router.post('/',(req,res)=>{
    if(req.body.fullName === '')
        res.send(false);
    else{
            const newUser = new User({
                name : req.body.fullName,
                gender : req.body.gender,
                dob : req.body.dob,
                howDidYouHearAboutUs : req.body.howDidYouHearAboutUs,
                emailId  : req.body.emailId,
                password : req.body.password,
                phoneNo :req.body.phoneNo,
                countryCode :req.body.countryCode,
                creditCardNo  : req.body.creditCardInfo    
            })

        newUser.save()
        .then(data =>{
            console.log(`${req.body.fullName} user Saved to DB`)
            res.send(true)
        })
        .catch(err =>{
            console.log(`${req.body.fullName} user not Saved to DB`)
            res.send(false)
        })
    }
    
    
})
module.exports = router;