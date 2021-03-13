import React from 'react';
import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {Dropdown,DropdownButton} from 'react-bootstrap'
import {apiURL} from './../../apiURL'
// read ALl the name with spicfic village

function AdminAddSubmission(props) {

    // Hooks
    const villagNameArray = ["دلوخیل","اباخیل","ناورخیل","آذیذان","وانڈا"]

    const [village,setVillage] = useState(villagNameArray[0]);
    const [listOfname,setListOfName] =useState([]);
    const [memberName,setName] = useState('');
    const [date,setDate] =useState('');
    const [amount,setAmount] =useState('500');


    // update Hooks
     const updateVillage = (name) =>{
        setVillage (name)
        // read the name by viilage
        // setName(Array Of Name)
        const testName = ['a','v']
        setListOfName(testName)
    }
    const updateName = (value) =>{
        setName(value);
    }
    const updateDate = (value) =>{
        setDate(value);
    }
    
    const updateAmount = (value) =>{
        setAmount(value);
    }

    return (
        <div className="center-loginForm">
           <div className="l-form">
                <Form>
                    {/* Name */}
                

                {/* Village Name */}
                <Form.Group>
                    <Form.Label>Village</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title={village}>
                        {villagNameArray.map((name,key)=>
                        <Dropdown.Item key={key} onSelect ={() =>{
                                updateVillage(name)
                        }}>{name}
                        </Dropdown.Item>
                    )}   
                    </DropdownButton>
                </Form.Group>

                {/* Name */}
                <Form.Group controlId="formBasicEmail">
                     <Form.Label>Select Member</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title={memberName}>
                        {listOfname.map((name,key)=>
                        <Dropdown.Item key={key} onSelect ={() =>{
                                updateName(name)
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
                

                {/* Amount*/}

                
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Relative Phone No.</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updateAmount(event.target.value)} type="number" placeholder="Enter Amount" />
                  
                </Form.Group>
                
                <Button onClick={()=>{
                   
                }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
           </div>
        </div>
    );
}

export default AdminAddSubmission;