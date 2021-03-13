import React from 'react';
import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import {apiURL} from './../../apiURL'

function AdminLogin(props) {

    // Hooks
    const [email,setEmail] =useState('');
    const [password,setPassowrd] =useState('');
    const navigate = useNavigate();
    const [message,setMessage] = useState('');
    // const { token, setToken } = useToken();
    // update Hooks
    const updateEmail = (value) =>{
        setMessage('')
        setEmail(value);
    }
    const updatePass = (value) =>{
        setPassowrd(value);
    }
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken===null ? false : true;
    };
    const addFunctionAmount= async (url,data) =>{
            let res = await axios.post(url,(data));
         
            if(res.data.members !== 0){
                sessionStorage.setItem("token", JSON.stringify(res.data.token));
                navigate('/admin/addMember',true);

            }
            else{
                setMessage('Fail to login...')
            }

            
    }
    const submitRespose = async (event) =>{
        event.preventDefault();
        const data = {
            email:email,
            password:password
        }
       
        await addFunctionAmount(`${apiURL}/v1/login/varify`,data);
        
    }
   
    return (
        
        <div className="center-loginForm">
           <div className="l-form">
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updateEmail(event.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {/* set Passwrod */}
                    <Form.Control onChange={event => updatePass(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <p>{message}</p>
                <Button variant="primary" onClick={(event)=>{
                    submitRespose(event);
                }} type="submit">
                    Submit
                </Button>
            </Form>
           </div>
        </div>
    );
    
   
}

export default AdminLogin;