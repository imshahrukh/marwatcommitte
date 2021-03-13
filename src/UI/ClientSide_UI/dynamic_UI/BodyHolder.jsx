import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from "../static_UI/navigation";
import Home from "./home"

function BodyHolder(props) {
    return (
        <div>
            <Navigation />
            <div style={{marginTop : "20px"}}></div>
            <div style={{display : "flex",justifyContent:"center"}}><Home /></div>
            <section className="main-body">
             <Outlet />
            </section>
        </div>
   
    );
}

export default BodyHolder;