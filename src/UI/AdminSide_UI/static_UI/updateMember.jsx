import React from 'react';
import {useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {Dropdown,DropdownButton} from 'react-bootstrap'
import axios from 'axios';
import {members} from './../../../data/members'
import {useNavigate  } from "react-router-dom";
import getToken from './../../../useLoginState'
import {apiURL} from './../../apiURL'
function AdminUpdateMember(props) {

    // Hooks
    const villagNameArray = ["دلوخیل","اباخیل","ناورخیل","آذیذان","وانڈا"]

    const [village,setVillage] = useState(villagNameArray[0]);
    const [villageNAME,setVillageNAME] = useState(villagNameArray);
    let [listOfNameByVillage,setListOfNameByVillage] = useState([]);
    const [listofMembersByVillage,setlistOfMemberByVillage] = useState(members);
    const [name,setName] =useState('');
    const [personalNumebr,setPersonalNumber] =useState('');
    const [realtiveNumber,setRelativeNumber] =useState('');
    const [result,setResult] =useState('');
    let [accepted,setAccepted] =useState(false);
    const [isloadingMemeber,setIsLoadingMember] = useState(false);
    // const [returnApplied,setReturnApplied] =useState(false);
    const navigate = useNavigate();


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
    const objectByName = (names) =>{
        // console.log(listofMembersByVillage)
        const el = listofMembersByVillage.filter(el => el.name===names ? (el) : "")
        return el
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
            
          
            setlistOfMemberByVillage(name_list.member_V)
            setListOfNameByVillage(name_list.member_N)
            setName((name_list.member_N)[0])
            // setVillage(name)
            setVillage(villages_n[0]) 
            setVillageNAME(villages_n);
                
            // get the member object by name and  set the number the feild
            // member by village

            setIsLoadingMember(true);
            // member name for the selected village

        })
        .catch(err => {
            console.log("fail to Load data")
        })
    },[]);

    const selectEmp = (Villagename) =>{
        let name_list = nameofMembers(Villagename,member)
        setlistOfMemberByVillage(name_list.member_V)
        setListOfNameByVillage(name_list.member_N)
        setVillage (Villagename)
        setResult("")
        
        
    }
    const updateName = (Membername) =>{
       
        setName(Membername)
        let memberr = objectByName(Membername); 
        setRelativeNumber(memberr[0].relative_phon);
        setPersonalNumber(memberr[0].personal_phon);
    }
   

    const updatePrsonalNumber = (value) =>{
        setPersonalNumber(value);
        setResult("")

    }
    const updateRelativeNumber = (value) =>{
        setRelativeNumber(value);
        setResult("")

    }
  

  
      const getData = async (url,sub_Data) =>{
        let res = await axios.patch(url,sub_Data);
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
        let  mem = objectByName(name);
      
        const data = {
            personal_phon: personalNumebr,
            relative_phon: realtiveNumber,
        }
        const url = `${apiURL}/v1/member/${mem[0]._id}`;
        // console.log(url)
        await getData(url,data);
        if(accepted===true){
            setResult("Upated ...")
            setAccepted(false);
        }
        else{
            setResult("Fail to Update")
        }
        

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

         

                {/* Phone number 1 */}

                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Personal Phone No.</Form.Label>
              
                    <Form.Control value={personalNumebr} onChange={event => updatePrsonalNumber(event.target.value)} type="text" placeholder="Enter Amount" />
                   
                </Form.Group>

                {/* Phone number 2 */}
                
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>Relative Phone No.</Form.Label>
                   
                    <Form.Control value={realtiveNumber} onChange={event => updateRelativeNumber(event.target.value)} type="text" placeholder="Enter Amount" />
                   
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

export default AdminUpdateMember;