import React from 'react';
import {useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {Dropdown,DropdownButton,Table} from 'react-bootstrap'
import axios from 'axios';
import {members} from './../../../data/members'
import {useNavigate  } from "react-router-dom";
import getToken from './../../../useLoginState'
import {apiURL} from './../../apiURL'

function AdminAllocateAmount(props) {

    // Hooks
    const villagNameArray = ["دلوخیل","اباخیل","ناورخیل","آذیذان","وانڈا"]

    const [village,setVillage] = useState(villagNameArray[0]);
    const [villageNAME,setVillageNAME] = useState(villagNameArray);
    let [listOfNameByVillage,setListOfNameByVillage] = useState([]);
    let [listOFCommiteHead,setListofCommitteHeads] = useState([]);
    const [listofMembersByVillage,setlistOfMemberByVillage] = useState(members);
    const [name,setName] =useState('');
    const [date,setDate] =useState('');
    const [head,setHead] =useState('');
    const [reason,setReason] =useState('');
    const [amount,setAmount] =useState('');
    const [result,setResult] =useState('');
    let [accepted,setAccepted] =useState(false);
    const [isloadingMemeber,setIsLoadingMember] = useState(false);
    const [returnApplied,setReturnApplied] =useState(false);
    const navigate = useNavigate();
     const [amounts,setAmounts] = useState('');
    // member
    const [member,setMember] = useState(members)
    const listOfmemberByVillage = (vill,members) =>{
       
        const filter_members = members.filter(function(el) {
                if(el.village_Name === vill){
                    return el;
                }
        })
        return filter_members;
    }
    const nameofMembers = (village,mem) =>{
        var membersByVillage = listOfmemberByVillage(village,mem);
        const member_names = membersByVillage.map(el =>(el.name))
        return {
            member_V: membersByVillage,
            member_N: member_names
        };
    }
      const idByName = (names) =>{
        const _id = listofMembersByVillage.filter(el => el.name===names ? (el._id) : "")
        return _id
    }
      const listofCommittiMembers = () =>{
        
        let listofMemberss = member.filter(function(el){
            if(el.status!=="" && el.status!=="-"){
                return (el)
            }
           
        })
        return listofMemberss
    }

    // get the list of the village 
     useEffect(() => {
        axios.get(`${apiURL}/v1/member`)
            .then(res => {
                    // get data from json
            const data = res.data.data;
            const mem_data = data.member;
            setMember(mem_data)
            
            
            
            
            // get all the village from the member and remove the duplicate
            var villages_n = mem_data.map(data => data.village_Name);
            villages_n = [...new Set(villages_n)];
            // const listOfMemberByVillage = (listOfmemberByVillage(villages_n[0],mem_data))
            let name_list = nameofMembers(villages_n[0],mem_data)
            const listOFheads = listofCommittiMembers();
            setHead(listOFheads[0].name)
            setListofCommitteHeads(listOFheads)
            setlistOfMemberByVillage(name_list.member_V)
            setListOfNameByVillage(name_list.member_N)
            setName((name_list.member_N)[0])
            setVillage(name)
            setVillage(villages_n[0]) 
            setVillageNAME(villages_n);
            // member by village
            setIsLoadingMember(true);
            // member name for the selected village

        })
        .catch(err => {
            console.log("fail to Load data")
        })
    },[]);
    useEffect(() => {
            axios.get(`${apiURL}/v1/amount`)
                .then(res => {
                    // get data from json
                    const data = res.data.data;
                    const mem_data = data.amounts;
                    setAmounts(mem_data[0].committe_amount)
                               
                })
                .catch(err => {
                    console.log("fail to Load data")
                })

        },[]);

    const selectEmp = (name) =>{
        let name_list = nameofMembers(name,member)
        setlistOfMemberByVillage(name_list.member_V)
        setListOfNameByVillage(name_list.member_N)
        setVillage (name)
        
    }
    const updateName = (value) =>{
        setName(value)
        
    }
    const updateDate = (value) =>{
        setDate(value);
    }

    const updateAmount = (value) =>{
        setAmount(value);
    }
    const CommiteHead = (value) =>{
        setHead(value);
    }
    const reas =(val) =>{
        setReason(val)
    }
    const rtrunApplied =(val) =>{
        setReturnApplied(val)
    }

    const checked = ()=>{
        setName("Other");
        setVillage ("Other");
        console.log("test")
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
      const addFunctionAmount= async (url,data) =>{
           await axios.patch(url,data);          
        }
    let addMemner = async(event) =>{
        event.preventDefault();
        let  mem_ID = idByName(name);
        mem_ID = mem_ID[0]._id
        const data = {
            _id_member: mem_ID,
            date:date,
            amount:amount,
            assign_by:listOFCommiteHead.map(el =>el.name),
            reason:reason,
            return_applied:returnApplied,
            amount_returned:{dates:[""],amount:[""]}
        }

        
        const url = `${apiURL}/v1/allocateAmount`;
        await getData(url,data);
        const temp_amount= amounts-amount;
        if(accepted===true){
            const url = `${apiURL}/v1/amount/6035e2aea95ade2cf0053857`;
                // data to update
                const d = {
                    committe_amount: temp_amount,
                }
                // method to send post request
            await addFunctionAmount(url,d)
            setResult("Amount Alloted...")
            setAccepted(false);
        }
        else{
            setResult("Fail to Allocate Amount")
        }
        setReturnApplied(false);

    }
     if(getToken()===false){
        navigate('/login');
    }
    if(isloadingMemeber===false){
       return ( <div>Loading .......</div>)
    }
    else{
        return (
        <div className="center-loginForm">
           <div className="l-form">
                <Form>
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


                 <Form.Group controlId="formBasicCheckbox">
                        <Form.Check onChange={()=>{
                            checked();
                        }} type="checkbox" label="Other" />
                </Form.Group>



                    {/* Name */}
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title={name}>
                        {listOfNameByVillage.map((name,key)=>
                        <Dropdown.Item key={key} onSelect ={() =>{
                                updateName(name)
                        }} >{name}
                        </Dropdown.Item>
                    )}   
                    </DropdownButton>
                </Form.Group>

                {/* Village Name */}
                

                {/* date Picker */}

                <Form.Group controlId="dob">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control onSelect={event => updateDate(event.target.value)} type="date" name="dob" placeholder="Date of Birth" />
                </Form.Group>
                

                {/* Phone number 1 */}

                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Amount</Form.Label>
                    {/* set Email */}
                    <Form.Control onChange={event => updateAmount(event.target.value)} type="text" placeholder="Enter Amount" />
                   
                </Form.Group>

                {/* Phone number 2 */}
                
                 <Form.Group>
                    <Form.Label>Alloted By:</Form.Label>
                    <DropdownButton id="dropdown-basic-button" title={head}>
                        {listOFCommiteHead.map((el,key)=>
                        <Dropdown.Item key={key} onSelect ={() =>{
                                CommiteHead(el.name)
                        }}>{el.name}
                        </Dropdown.Item>
                    )}   
                    </DropdownButton>
                </Form.Group>
                
                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" onChange={()=>{
                        rtrunApplied(true)
                    }} label="Return Applied" />
                </Form.Group>

               <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control as="textarea" name="description" value={reason}  onChange={event => reas(event.target.value)}  rows={3} >{reason}</Form.Control>
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

export default AdminAllocateAmount;