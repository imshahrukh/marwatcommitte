import React from 'react';
import {useNavigate  } from "react-router-dom";
import getToken from './../../../useLoginState'
import {useEffect} from 'react'


function AdminLogout(props) {

    const navigate = useNavigate();
    useEffect(()=>{
         if(getToken()!==false){
        sessionStorage.clear();
        navigate('/login',true);
    }
    },[])
   

    return (
            <div>Logout</div>
    );
    
 
    
   
}

export default AdminLogout;