import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// Importing other required Components
import SignInForm from './SignInForm'
import PersonlInfo from './PersonInfo'

//importing css files 
import '../App.css'
import './SignIn.css'

export class SignIn extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:'',
            password:'',
            gender :'',
            dob : '',
            email: '',
            phoneNo:'',
            card:'',
            source:'',
            isFormActive:true,
            heading : 'Uibix',
            imagesource : '/img/signin.png'

        }
    
    }
    
    toggleSignInFormState =(returnName , returnGender , returndob , returnEmail,returnphoneNo,returnCard,returnSource)=>{
        this.setState({
            name : returnName,
            isFormActive : false,
            gender : returnGender,
            dob : returndob ,
            email : returnEmail ,
            phoneNo : returnphoneNo ,
            card : returnCard ,
            source : returnSource

        })
    }

    

    render() {
        
        return (
            <div className='main'>
                {/*Left Part  */}
               <div className='signin-left-part animate__animated animate__slideInLeft'>
                    <Link to='/' className='signinbacktohomepage'>
                       <i className="fa fa-arrow-left"></i> Home
                    </Link>    
                    <img src={this.state.isFormActive ? '/img/signin.png':'/img/info.png'} alt='' id='signin-image'/>
               </div>

                {/* Right Part */}
               <div className='signin-right-part animate__animated animate__slideInRight' >
                    <h2 className='right-part-heading'>{this.state.isFormActive ? 'uibix' : 'hey you!'}</h2>
                    
                    {
                        
                        this.state.isFormActive  ? <SignInForm data={
                                {
                                    isFormActive : this.state.isFormActive,
                                    toggleSignInFormStateCallBack : this.toggleSignInFormState.bind(this)
                                }
                            } />   :   null
                    }
                    {
                         !(this.state.isFormActive)  ? <PersonlInfo data={
                                {
                                  fullName : this.state.name ,
                                  gender : this.state.gender ,
                                  dob : this.state.dob ,
                                  email : this.state.email ,
                                  phoneNo : this.state.phoneNo ,
                                  card : this.state.card ,
                                  source : this.state.source
                                }
                            } />   :   null
                    }
                    
                </div>
            </div>
        )
    }
}
export default SignIn
