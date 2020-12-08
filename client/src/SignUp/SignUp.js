import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// For connecting FronEnd to BackEnd
import axios from 'axios'

// Importing css
import '../App.css'
import './SignUp.css';

export class SignUp extends Component {
    constructor(props){
        super(props);
        this.state ={
            fullName : '',
            gender : 'N/A',
            dob :'',
            howDidYouHearAboutUs : 'Google',
            emailId : '',
            phoneNo:'',
            password: '',
            creditCardInfo :'',
            creditCardName : '',      
            isPersonalInfoActive : true ,
            isAccountDetailsActive :false,
            nameError : '',
            emailError: '',
            phoneNoError:'',
            creditCardError:'',
            isLoweCasePresent:false,
            isUpperCasePresent:false,
            isDigitPresent:false,
            isSpecialCharPresent:false,
            isMin8CharPresent:false
        }
    }

    // To Handle Form Submission
    mySubmitHandler =(event)=>{
        event.preventDefault(); 
        
        // Create user to send to Backend
        const user ={
            fullName:String(this.state.fullName).toLowerCase(),
            gender:this.state.gender,
            dob:this.state.dob,
            howDidYouHearAboutUs :this.state.howDidYouHearAboutUs, 
            emailId : this.state.emailId,
            password : this.state.password,
            phoneNo :  this.state.phoneNo,
            countryCode :91,
            creditCardInfo : this.state.creditCardInfo
        }
        
        // console.log(user)

        let confirmataionMessageElement = document.getElementById('confirmataion-message');
        confirmataionMessageElement.innerText = '';
        confirmataionMessageElement.classList.remove('confirmationerrormessage');
        confirmataionMessageElement.classList.remove('successMessage')
        
        //send data to BackEnd
        axios.post('https://uibixproject.herokuapp.com/signup',user)
            .then(res =>{
                    if(res.data === true){
                        // console.log('data saved');
                        confirmataionMessageElement.classList.toggle('successMessage')
                        confirmataionMessageElement.innerText = 'Successfully SignUp';
                        
                    }else{
                        // console.log('Problem to save')
                        confirmataionMessageElement.classList.toggle('confirmationerrormessage')
                        confirmataionMessageElement.innerText = 'Error In Signup(Check IF all Inputs are Filled Coorectly)';
                    }
        }) //axios part End

        
        // To remove confirmation message after few seconds
        setTimeout(()=>{
            confirmataionMessageElement.innerText ='';
            // console.log('removed confirmation message after some time');
        },5000)
        
        
    }

    // To handle change in input
    inputChangeHandler = (event)=>{
        const target = event.target;
        // console.log(event)
        
        const name = target.name ;
        const value = target.value;
        // console.log(name)
        // console.log(value)

        // For Cheking input and showing Errors
        let pattern ;
        switch(name){
            // For FullName
            case "fullName":
                pattern = /\d/g;
                if(value.length < 4 && pattern.test(value) === true){
                    this.setState({
                        nameError : 'Enter Full Name and name should not contain number'
                    })
                }else{
                    this.setState({
                        nameError:''
                    })
                }
                break;
            // For EmailID
            case "emailId":
                pattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(pattern.test(String(value).toLocaleLowerCase())===true && value !== ''){
                    this.setState({
                        emailError:''
                    })
                }else{
                    this.setState({
                        emailError:'Enter Valid Email Address'
                    })
                }
                break;
            // For PhoneNo
            case "phoneNo":
                if((String(value).length === 10) || value ===''){
                    this.setState({
                        phoneNoError : ''
                    })
                }else{
                    this.setState({
                        phoneNoError : 'Mobile No shoule be 10 digit long'
                    })
                }
                break;
            // For Password
            case  "password":
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
            
            // For CreditCard
            case "creditCardInfo" :
                if((String(value).length === 16)){
                    this.setState({
                        creditCardError : ''
                    })
                }else{
                    this.setState({
                       creditCardError: 'Enter Valid Credit Card No'
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
    // handle account-details click
    accountDetailslinkClickHandler = (event)=>{
       let isActive = this.state.isAccountDetailsActive ;
       let img = document.getElementById('signup-image');
       if(!isActive){
           this.setState({
               isAccountDetailsActive:true,
               isPersonalInfoActive : false
            })
       }
       img.src ='/img/accountdetails.png';

       
    }   
    // handle personal info link
    personalInfolinkClickHandler =(event)=>{
        let isActive = this.state.isPersonalInfoActive ;
        let img = document.getElementById('signup-image');
        if(!isActive){
            this.setState({
               isAccountDetailsActive:false,
               isPersonalInfoActive : true
            })
            img.src ='/img/forpersonalinfo.png'
        }
    }

    // handle continue buttnon click
    continueButtonHandler =(event)=>{
        this.setState({
            isPersonalInfoActive : false,
            isAccountDetailsActive : true
        })
        event.preventDefault()
    }
    
    render() {
        return (
            <div className='main'>

                <div className='signup-left-part' >

                    <Link to='/' className='signupbacktohomepage'>
                       <i className="fa fa-arrow-left"></i> Home
                    </Link>

                    <h1 className='signupfromname'>Sign up</h1>
                    
                    <nav>
                        <a href='#personal-info'  onClick={this.personalInfolinkClickHandler} className={this.state.isPersonalInfoActive ? 'active-link':'inactive-link'}>
                            Personal Info 
                        </a>
                        <a href='#account-details' onClick={this.accountDetailslinkClickHandler} className={this.state.isAccountDetailsActive ? 'active-link':'inactive-link'} >
                            Account Details
                        </a>
                    </nav>

                    <form onSubmit={this.mySubmitHandler}  method='post' id='signinform'>
                        <br/>

                        {/* Personal info part */}
                        <div  id='personal-info' style={{ display: this.state.isPersonalInfoActive ? "block" : "none" }} className='animate__animated animate__fadeInLeft'>
                            <p className='input-label'>Full Name</p>
                                <input type='text' name='fullName' onChange={this.inputChangeHandler}></input>
                                        <p className='errormessage'>{this.state.nameError ? this.state.nameError:null} </p> {/*error message */}
                            <br/>

                            <p className='input-label'>Gender </p>
                                <select  name='gender' onChange={this.inputChangeHandler} >
                                    <option  value="male">I am Male</option>
                                    <option value="female">I am Female</option>
                                    <option value="transgender"> I am Transgender</option>
                                    <option  value="N/A">Don't Want To Mention</option>
                                </select>
                            <br/><br/>
                            
                            <p className='input-label'>Date of Birth</p>
                                <input type='Date' name='dob' onChange={this.inputChangeHandler}></input>
                            <br/><br/>

                            <p className='input-label'>How Did You Hear About Us? <span style={{color:'red'}}>*</span></p>
                                <select  name='howDidYouHearAboutUs' onChange={this.inputChangeHandler}  defaultValue='Google'>
                                    <option value='Google' defaultValue>Google</option>
                                    <option value='FaceBook'>FaceBook</option>
                                    <option value='LinkedIn'>LinkedIn</option>
                                    <option value='Twitter'>Twitter</option>
                                    <option value='Friend'>Friend</option>
                                    <option value='Referral'>Referral</option>
                                    <option value='Other'>Other</option>
                                </select>
                            <br/><br/>
                            
                            <button onClick={this.continueButtonHandler} className='signupbutton'>CONTINUE</button>
                        </div>

                        
                        
                        {/* Account details part */}
                        <div  id='account-details' style={{ display: this.state.isAccountDetailsActive ? "block" : "none" }} className='animate__animated animate__fadeInLeft'>
                            <p className='input-label'>Email ID</p>
                            <input type="emailid" name='emailId' onChange={this.inputChangeHandler} ></input>
                                    <p className='errormessage'>{this.state.emailError ? this.state.emailError:null}</p>{/*error message */}
                            <br/>

                            <p className='input-label'>Create New Password</p>
                                <input type='password' name='password' onChange={this.inputChangeHandler}></input>
                                    <p  className='errormessage'style={{ display: this.state.isLoweCasePresent ? "none" : "block" }}>At least 1 lowercase character.</p>{/*error message */}
                                    <p  className='errormessage'style={{ display: this.state.isUpperCasePresent ? "none" : "block" }}>At least 1 uppercase character.</p>{/*error message */}
                                    <p  className='errormessage'style={{ display: this.state.isDigitPresent ? "none" : "block" }}>At least 1 digit.</p>{/*error message */}
                                    <p  className='errormessage'style={{ display: this.state.isSpecialCharPresent ? "none" : "block" }}>At least 1 Special character.</p>{/*error message */}
                                    <p  className='errormessage'style={{ display: this.state.isMin8CharPresent ? "none" : "block" }}>Minimum 8 characters.</p>{/*error message */}
                            <br/>

                            <p className='input-label'>Phone No (Optional)</p>
                                <input type='Number' pattern='\d{3}[\-]\d{3}[\-]\d{4}' name='phoneNo' onChange={this.inputChangeHandler}></input>
                                    <p className='errormessage'>{this.state.phoneNoError ? this.state.phoneNoError:null}</p>{/*error message */}
                            <br/>
                            
                            
                            <p className='input-label'>Credit Card Info</p>
                                <input  type="number" name='creditCardInfo' maxLength={15} placeholder="xxxx xxxx xxxx xxxx" onChange={this.inputChangeHandler}></input>
                                    <p className='errormessage'>{this.state.creditCardError ? this.state.creditCardError:null}</p>{/*error message */}
                            <br/><br/>

                            <button type='submit' className='signupbutton' >SUBMIT</button>
                        </div>

                        <br/>
                        
                        
                        <p className='go-opposite-component'>
                            AllReady Have An Account? 
                            <Link to='/signin' className='go-opposite-component-link'>
                               <span> Sign In</span>
                            </Link> 
                        </p>

                        <h2 id='confirmataion-message'> </h2>
                    
                    </form>
                </div>

                <div className='signup-right-part animate__animated animate__zoomIn'>
                    <h2 className='title'>Uibix</h2>
                    <img src='/img/forpersonalinfo.png' alt='' id='signup-image' />
                </div>
            </div>
        )
    }
}

export default SignUp
