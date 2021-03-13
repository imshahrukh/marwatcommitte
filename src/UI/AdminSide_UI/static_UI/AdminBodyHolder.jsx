import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

function AdminBodyHolder(props) {
    return (
        <div>
            <Navigation />
            <div style={{marginTop : "20px"}}></div>
            <section className="main-body">
             <Outlet />
            </section>
        </div>
   
    );
}

export default AdminBodyHolder;