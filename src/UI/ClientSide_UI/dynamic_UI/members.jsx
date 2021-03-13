import React from 'react';
import {Dropdown,DropdownButton,Table} from 'react-bootstrap'
import {useState,useEffect } from 'react'
import axios from 'axios';
import {apiURL} from './../../apiURL'
import {members} from './../../../data/members'
// Load the data from the Member Table 
// get the village
// display the result
// Local File
function Members(props) {
    const [villages_NAME,setVillagesNAME] =useState([])
    const [village_n,setVill_name] = useState("");
    const [tot_members,setMembers] = useState(members);
    const [LISTOFMEMNER,SET_LISTOFMEMBER] = useState(members);
    const [isLoading,setIsLoading] = useState(true)

    // hooks
    useEffect(() => {
         axios.get(`${apiURL}/v1/member`)
            .then(res => {
                // get data from json
                const data = res.data.data;
                const mem_data = data.member;
                // get All villages and filter All villages
                var villages_n = mem_data.map(data => data.village_Name);
                villages_n = [...new Set(villages_n)];
                // -----> set VALUES to HOOKS <-------
                // get the first Villge
                setVill_name(villages_n[0])
                // set All village to the hook
                setVillagesNAME(villages_n)
                // set All member to the hook
                setMembers(mem_data)
                SET_LISTOFMEMBER(mem_data) 
                // De-Activity the LOADING
                setIsLoading(false);
            })
            .catch(err => {
                console.log("fail to Load data")
            })

    },[]);

// Month name
    function selectEmp(name) {
        setVill_name(name);
        setMembers(LISTOFMEMNER.filter(element => element.village_Name === name));
    }
    if(isLoading){
        return (
            <div className="Loading"><div className="loding-content">Loading......</div></div>
        )
    }
    else{
        return (
        <div className="moneyInformation-Containor">
            
         
            <div className="comnoBox">
                
                <DropdownButton  id="dropdown-basic-button" title={village_n}>
                        {villages_NAME.map((name,key)=>
                    <div className="sc" key={key}> <Dropdown.Item  onSelect ={() =>{
                        selectEmp(name)
                    }}>{name}</Dropdown.Item></div>
                )}   
                </DropdownButton>

                <p className="ComboTags">محلہ</p>
                
            </div>
            <div className="tableContainor">
                <div className="tableHolder">
                     <Table className="tbs" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                       
                        <th style={{textAlign:'right'}}>سٹیٹس</th>
                        <th style={{textAlign:'right'}}>ورثاء نمبر</th>
                        <th style={{textAlign:'right'}}>موبایل نمبر</th>
                        <th style={{textAlign:'right'}}>تاریح شمولیت</th>
                        <th style={{textAlign:'right'}}>محلہ</th>

                        <th style={{textAlign:'right'}}>نام</th>
                         <th style={{textAlign:'right'}}>#</th>
                        </tr>
                    </thead>
                    <tbody>

                        {tot_members.map((element,key) =>
                            <tr key={key}>
                       
                                <td style={{textAlign:'right'}}>{element.status}</td>
                                <td style={{textAlign:'right'}}>{element.relative_phon}</td>
                                <td style={{textAlign:'right'}}>{element.personal_phon}</td>
                                <td style={{textAlign:'right'}}>{element.data_of_joining.substring(0, 10)}</td>
                                <td style={{textAlign:'right'}}>{element.village_Name}</td>
                                <td style={{textAlign:'right'}}>{element.name}</td>
                                <td style={{textAlign:'right'}}>{key+1}</td>
                            </tr>
                        )}
                       
         
                    </tbody>
                </Table>
                </div>
               
            </div>

            {/* div*/}
            


        </div>
    );
    }
    
}

export default Members;