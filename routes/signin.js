const express = require('express');

const router = express.Router()

const User = require('../models/user')


//to update password
router.post('/resetpassowrd',(req,res)=>{
    let userName=req.body.username;
    let newPassword=req.body.newpassword;
    // console.log(demail, '  ',pass)
    User.updateOne({ 'name':userName }, { $set:{ 'password':newPassword }}, (err, user) => {
        let output = JSON.stringify(user)
        let arr =[...output];
        // console.log(arr+" "+arr.length)
        console.log(arr[5]);
        // console.log('user: '+output);
        if (arr[5]==='1')
        {
            console.log(`password of user ${userName} updated Successfully` );
            res.send(true);
        }
        else
        {
            console.log(`error in password update for user ${userName}` + JSON.stringify(err, undefined, 2))
            res.send(false);
        }
            
    })

})




// Signin post request
router.post('/',(req,res)=>{

    let userName = req.body.name ;
    String(userName).toLowerCase();//convert user name to lowecase
    let userPassword = req.body.password;

    // console.log('name : '+userName+' password: '+userPassword)
    
    User.findOne({'name':userName , 'password':userPassword},(err,user)=>{
        if(err==null && user==null){
            console.log('inside  Signin error=> error: '+err+' user: '+user);
            res.send(false)
        }else{
            console.log(`${userName} found in DB`);
            res.send(user);
        }
    })
})


module.exports = router;