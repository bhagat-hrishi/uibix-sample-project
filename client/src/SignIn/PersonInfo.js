import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// Importing css
import './PersonalInfo.css'
export class PersonInfo extends Component {
    render() {
        return (
            <div >
                <div className='userinfo'>
                        <div><span className='property'>Full Name - </span>{this.props.data.fullName }</div><br/>
                        <div><span className='property'>Gender - </span>{this.props.data.gender}</div><br/>
                        <div><span className='property'>Date of Birth - </span>{this.props.data.dob}</div><br/>
                        <div><span className='property'>Email - </span>{this.props.data.email}</div><br/>
                        <div><span className='property'>Phone - </span>+91 {this.props.data.phoneNo}</div><br/>
                        <div><span className='property'>Card - </span>{this.props.data.card}</div><br/>
                        <div><span className='property'>Source - </span>{this.props.data.source}</div>
                </div>
                <div>
                    <Link to='/' className='logout'>
                        <span> Logout</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default PersonInfo
