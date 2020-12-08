import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// For connecting FronEnd to BackEnd
import axios from 'axios'

// Importing css
import './SignInForm.css'



export class SignInForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            forminputname : '',
            forminputpassword:'',
            confirmationMessage : '',
            newpassword :'',
            verifynewpassword: '',
            passwordUpdateMessage: null,
            nameError:'',
            resetFormActive  :  false, 
            isLoweCasePresent:false,
            isUpperCasePresent:false,
            isDigitPresent:false,
            isSpecialCharPresent:false,
            isMin8CharPresent:false
        }
    }

    // To handle change in input
    inputChangeHandler = (event)=>{
            const target = event.target;
            // console.log(event)
            
            const name = target.name ;
            let value = target.value;
            // console.log(name)
            // console.log(value)

            let pattern;
            switch (name) {
                // to validate name
                case "forminputname":
                    pattern = /\d/g;
                    if(pattern.test(value) === true){
                        this.setState({
                            nameError : 'Enter Full Name and name should not contain number'
                        })
                    }else{
                        this.setState({
                            nameError:''
                        })
                    }
                    break;
                // to validate password
                case "forminputpassword":
                    if(value.match(/[a-z]/g)){
                        this.setState({
                            isLoweCasePresent : true
                        })
                    }else{
                        this.setState({
                            isLoweCasePresent : false
                        })
                    }
                    if(value.match(/[A-Z]/g)){
                        this.setState({
                            isUpperCasePresent : true
                        })
                    }else{
                        this.setState({
                            isUpperCasePresent : false
                        })
                    }
                    if(value.match(/[0-9]/g)){
                        this.setState({
                            isDigitPresent : true
                        })
                    }else{
                        this.setState({
                            isDigitPresent : false
                        })
                    }
                    if(value.match(/[^a-zA-Z\d]/g)){
                        this.setState({
                            isSpecialCharPresent : true
                        })
                    }else{
                        this.setState({
                            isSpecialCharPresent : false
                        })
                    }
                    if(value.length >= 8){
                        this.setState({
                            isMin8CharPresent : true
                        })
                    }else{
                        this.setState({
                            isMin8CharPresent : false
                        })
                    }
                    break;
            
                default:
                    break;
            }
            this.setState({
                [name]:value
            })
        
    }
    
    // send data to BackEnd
    loginFormSubmissionHandler=(event)=>{
            event.preventDefault(); 
            // console.log(this.state.forminputname+" "+this.state.forminputpassword)
            const user ={
                name : this.state.forminputname,
                password: this.state.forminputpassword
            }
            axios.post('http://localhost:9000/signin',user)
                .then(res =>{
                    let responsoeOfRequest = res.data;
                    // console.log(responsoeOfRequest)
                    
                    if(responsoeOfRequest === false){
                        this.setState({
                            confirmationMessage:'UserName or Password is Invalid'
                        })
                        document.getElementById('confirm-message').style.color='#df4949';
                    
                        setTimeout(()=>{
                                this.setState({
                                confirmationMessage:null
                            })
                        },6000)

                    }
                    else
                    {
                        this.setState({
                                confirmationMessage:'login success'
                        })
                        // Login is success and now pass data to call back function
                        this.props.data.toggleSignInFormStateCallBack(
                            responsoeOfRequest.name,
                            responsoeOfRequest.gender,
                            responsoeOfRequest.dob,
                            responsoeOfRequest.emailId,
                            responsoeOfRequest.phoneNo,
                            responsoeOfRequest.creditCardNo,
                            responsoeOfRequest.howDidYouHearAboutUs
                        )
                    
                    }
               })//.then part end
    }   
    
    // For Reset Form start 
    showResetFormHandler =(toshow)=>{
        // console.log('toshow '+toshow);
        if(toshow === 'showforgot'){
            this.setState({
                resetFormActive : true
            })
        }
        else if(toshow === 'showlogin'){
            this.setState({
                resetFormActive:false
            })
        }
    }

    resetFormSubmissionHandler=(event)=>{
        event.preventDefault();
        // console.log(this.state.forminputname)
        // console.log(this.state.newpassword+" "+this.state.newpassword)
        if(this.state.newpassword !== this.state.verifynewpassword){
            alert('Both Entered new password must be equal')
            return ;
        }
        else
        {
            const user = {
                username : this.state.forminputname,
                newpassword : this.state.newpassword
            }
            axios.post('http://localhost:9000/signin/resetpassowrd',user)
            .then(res =>{
                let responsoeOfRequest = res.data;
                // console.log(responsoeOfRequest)
                if(responsoeOfRequest === false){
                        this.setState({
                            passwordUpdateMessage :'Error In Update'
                        })
                        document.getElementById('password-update-message').style.color='#df4949';
                }else
                {
                    this.setState({
                            passwordUpdateMessage : 'Passord Update Successfully',
                    })
                    document.getElementById('password-update-message').style.color='#5cb85c';
                }

                // Clearing input fields for reset form
                document.getElementById('resetname').value='';
                document.getElementById('resetnewpassword').value='';
                document.getElementById('resetverifypassword').value='';

                setTimeout(()=>{
                         this.setState({
                            passwordUpdateMessage:null
                        })
                },6000)
        })

        }

    }
    // For Reset Form End

    
    render() {
        return (
            <div>
                {/* For Signin form */}
                    <form  id='signinform ' style={{ display: this.state.resetFormActive ? "none" : "block" }}>
                        <h1 className='signinfromname' >Sign In </h1>
                        <br/>
                        <p>Username</p>
                            <input type='text'  name='forminputname' onChange={this.inputChangeHandler}></input>
                                <p className='errormessage'>{this.state.nameError ? this.state.nameError:null} </p> {/*error message */}
                        <br/><br/>
                    
                        <p>Password</p>
                            <input type='password' name='forminputpassword' onChange={this.inputChangeHandler}></input>
                                <p  className='errormessage'style={{ display: this.state.isLoweCasePresent ? "none" : "block" }}>At least 1 lowercase character.</p>{/*error message */}
                                <p  className='errormessage'style={{ display: this.state.isUpperCasePresent ? "none" : "block" }}>At least 1 uppercase character.</p>{/*error message */}
                                <p  className='errormessage'style={{ display: this.state.isDigitPresent ? "none" : "block" }}>At least 1 digit.</p>{/*error message */}
                                <p  className='errormessage'style={{ display: this.state.isSpecialCharPresent ? "none" : "block" }}>At least 1 Special character.</p>{/*error message */}
                                <p  className='errormessage'style={{ display: this.state.isMin8CharPresent ? "none" : "block" }}>Minimum 8 characters.</p>{/*error message */}
                        <br/>
                        <p  onClick={this.showResetFormHandler.bind(this,'showforgot')} className='forgotpassword'>Forgot Password ?</p>
                    
                        <br/>
                        <button onClick={this.loginFormSubmissionHandler}>LOGIN</button>
                        <br/>
                        <p className='go-opposite-component'>
                            Dont't have Account?
                            <Link to='/signup' className='go-opposite-component-link'>
                                <span> Sign Up</span>
                            </Link>
                        </p>

                        <p id='confirm-message'>{this.state.confirmationMessage}</p>
                </form>

                {/* For Recover password form */}
                <form id='recover-password'  style={{ display: this.state.resetFormActive ? "block" : "none" }}>
                    <h1 className='signinfromname' >Update Password</h1>   
                    <br/>
                        <p>Username</p>
                            <input type='text'  id='resetname' name='forminputname' onChange={this.inputChangeHandler}></input>
                        <br/><br/>
                    
                        <p>New Password</p>
                            <input type='password' id='resetnewpassword' name='newpassword' onChange={this.inputChangeHandler}></input>
                        <br/><br/>

                        <p> Verify Password</p>
                            <input type='password' id='resetverifypassword' name='verifynewpassword' onChange={this.inputChangeHandler}></input>
                        <br/>
                        <br/>
                        <button onClick={this.resetFormSubmissionHandler} >RESET PASSWORD</button>
                        <br/>
                        <br/>
                        <p  onClick={this.showResetFormHandler.bind(this,'showlogin')} className='forgotpassword'>Back To Login</p>

                        <p id='password-update-message'>{this.state.passwordUpdateMessage}</p>
                </form>  
            
            </div>
        )
    }
}

export default SignInForm
