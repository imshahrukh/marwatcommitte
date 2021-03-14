import React from 'react';
import {useState} from 'react'
import { Link } from "react-router-dom";
import{DropdownButton,Dropdown} from 'react-bootstrap'
function Navigation(props) {

    const [links,setLinks] = useState('تفصیلات');

    const updateLink = (url) =>{
        setLinks(url);
    }
    return (
        <nav className="navs">
             <ul className="li-containor">
                
                 
                 <li className="items">
                  <Link className="li" to="/moneyInformation">
                      تفصیلات
                  </Link>
                 </li>
                 <li className="items">
                  <Link className="li" to="/annualSubmittedAmount">
                      سالانہ تقریب  فنڈ 
                  </Link>
                 </li>
                 <li className="items"><Link className="li" to="/rule">
                      اصول 
                  </Link></li>
                 <li className="items"><Link className="li" to="/members">
                      ممبران
                  </Link></li>
               
                 <li className="items">
                  <Link className="li" to="/heads">
                      نگران
                  </Link>
                 </li>
                 <li className="items">
                  <Link className="li" to="/donation">
                      عطیات
                  </Link>
                 </li>
                 <li className="items">
                  <Link className="li" to="/login">
                      لوگن
                  </Link>
                 </li>
             </ul>

            <div className="mob-view">
                <DropdownButton id="dropdown-item-button" title={links}>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('تفصیلات');
                    }} href="/moneyInformation"> تفصیلات</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('نگران');
                    }} href="/heads"> نگران</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('ممبران');
                    }} href="/members">ممبران</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('عطیات');
                    }} href="/donation">عطیات</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('اصول');
                    }} href="/rule">اصول</Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('سالانہ تقریب  فنڈ ');
                    }} href="/annualSubmittedAmount">سالانہ تقریب  فنڈ </Dropdown.Item>
                    <Dropdown.Item onClick = {()=>{
                        updateLink('لوگن');
                    }} href="/login">لوگن</Dropdown.Item>
                </DropdownButton>
            </div>


        </nav>
    );
}

export default Navigation;