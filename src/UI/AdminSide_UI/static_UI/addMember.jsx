import React from 'react';
import {useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {Dropdown,DropdownButton} from 'react-bootstrap'
import axios from 'axios';
import {useNavigate  } from "react-router-dom";
import getToken from './../../../useLoginState'
import {apiURL} from './../../apiURL'
function AdminAddMember(props) {

    // Hooks
    const villagNameArray = ["دلوخیل","اباخیل","ناورخیل","آذیذان","وانڈا"]

    const [village,setVillage] = useState(villagNameArray[0]);
    const [villageNAME,setVillageNAME] = useState(villagNameArray);
    const [name,setName] =useState('');
    const [date,setDate] =useState('');
    const [ph1,setPh1] =useState('');
    const [ph2,setPh2] =useState('');
    const [perStatus,setperStatus] =useState('');
    const [result,setResult] =useState('');
    let [accepted,setAccepted] =useState(false);
    const navigate = useNavigate();
    

    // get the list of the village 
     useEffect(() => {
        axios.get(`${apiURL}/v1/member`)
            .then(res => {
                    // get data from json
            const data = res.data.data;
            const mem_data = data.member;
                    // get all the village from the member and remove the duplicate
            var villages_n = mem_data.map(data => data.village_Name);
            villages_n = [...new Set(villages_n)];
            setVillageNAME(villages_n)
                  
        })
        .catch(err => {
            console.log("fail to Load data")
        })
    },[]);
    // update Hooks
     const selectEmp = (name) =>{
        setVillage (name)
        
    }
    const updateName = (value) =>{
        setResult("")
        
    }
    const updateDate = (value) =>{
  
        setDate(value);
    }

    const updatePh1 = (value) =>{
        setPh1(value);
    }

   const updatePh2 = (value) =>{
        setPh2(value);
    }
    const status = (value) =>{
        setperStatus(value);
    }
  
      const getData = async (url,sub_Data) =>{
        let res = await axios.post(url,sub_Data);
     
        let {status} = res.data;
       
        if(status==="success"){
            accepted=true
        }
        else{
            accepted=false
        }
    }
    let addMemner = async(event) =>{
        event.preventDefault();
        const data = {
            name:name,
            village_Name:village,
            personal_phon:ph1,
            relative_phon:ph2,
            data_of_joining:date,
            status:""
        }
        const url = `${apiURL}/v1/member`;
        await getData(url,data);
        if(accepted===true){
            setResult("Member Registerd...")
            setAccepted(false);
        }
        else{
            setResult("Fail to Register Member")
        }


    }
    if(getToken()===false){
        navigate('/login',true);
        return "test"
        
    }
    else{
        return (
        <div className="center-loginForm">
           <div className="l-form">
                <Form>
                    {/* Name */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updateName(event.target.value)} type="text" placeholder="Enter name" />
                    <Form.Text className="text-muted">
                    Please enter the name
                    </Form.Text>
                </Form.Group>

                {/* Village Name */}
                <Form.Group>
                    <Form.Label>Village</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title={village}>
                        {villageNAME.map((name,key)=>
                        <Dropdown.Item key={key} onSelect ={() =>{
                                selectEmp(name)
                        }}>{name}
                        </Dropdown.Item>
                    )}   
                    </DropdownButton>
                </Form.Group>

                {/* date Picker */}

                <Form.Group controlId="dob">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control onSelect={event => updateDate(event.target.value)} type="date" name="dob" placeholder="Date of Birth" />
                </Form.Group>
                

                {/* Phone number 1 */}

                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Personal Phone NO.</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updatePh1(event.target.value)} type="text" placeholder="Enter your phone number" />
                   
                </Form.Group>

                {/* Phone number 2 */}
                
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Relative Phone No.</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updatePh2(event.target.value)} type="text" placeholder="Relative Phone number" />
                </Form.Group>
                
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => status(event.target.value)} type="text" placeholder="Member Status" />
                </Form.Group>
                <div> {result} </div>
                <Button onClick={(event)=>{
                    addMemner(event);
                }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
           </div>
        </div>
    );
    }

    
}

export default AdminAddMember;