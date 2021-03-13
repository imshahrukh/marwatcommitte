import React from 'react';
import {useState} from 'react'
import { Link } from "react-router-dom";
import{DropdownButton,Dropdown} from 'react-bootstrap'
function Navigation(props) {

    const [links,setLinks] = useState('Add Member');

    const updateLink = (url) =>{
        setLinks(url);
    }
    return (
        <nav className="navs">
             <ul className="li-containor">
                
                 
                 <li className="items">
                  <Link className="li" to="addMember">
                      Add Member
                  </Link>
                 </li>
                 <li className="items">
                  <Link className="li" to="updateMember">
                       Update Member
                  </Link>
                 </li>
                 <li className="items"><Link className="li" to="addAmount">
                      Add Amount
                  </Link></li>
                 <li className="items"><Link className="li" to="allocateAmount">
                      Allocate Amount
                  </Link></li>
               
                 <li className="items">
                  <Link className="li" to="annualSubmittedAmount">
                      Annual Submission
                  </Link>
                 </li>
                 <li className="items">
                  <Link className="li" to="logout">
                      logout
                  </Link>
                 </li>
             </ul>

            <div className="mob-view">
                <DropdownButton id="dropdown-item-button" title={links}>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Add Member');
                    }} href="/admin/addMember"> Add Member</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Update Member');
                    }} href="/admin/updateMember"> Update Member</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Add Amount');
                    }} href="/admin/addAmount">Add Amount</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Allocate Amount');
                    }} href="/admin/allocateAmount">Allocate Amount</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Annual Submission');
                    }} href="/admin/annualSubmittedAmount">Annual Submission</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('Logout');
                    }} href="/admin/logout">Logout</Dropdown.Item>
                </DropdownButton>
            </div>


        </nav>
    );
}

export default Navigation;