import React from 'react';
import {Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import {members} from './../../../data/members'
import axios from 'axios';

function Donations(props) {


    const [memeber,setMember] = useState(members)
    let [allocatedAmount,setAllocatedAmount] = useState();

    const [pageLoading,setPageLoading] = useState(true);
    const [isMemberLoading,setIsMemeberLoading] = useState(false);
    const [isAmountAllocatedLoading,setAllocatedLoading] = useState(false);
    let [final_list,setFinalList] = useState();

    useEffect(() => {
        axios.get('http://localhost:9000/v1/member')
            .then(res => {
                    // get data from json
            const data = res.data.data;
            const mem_data = data.member;
            // console.log(mem_data)

            setMember(mem_data)
            
            setIsMemeberLoading(true);
        })
        .catch(err => {
            console.log("fail to Load data")
        })
    },[]);

    useEffect(() => {
        axios.get('http://localhost:9000/v1/allocateAmount')
            .then(res => {
            const data = res.data.data;
            const mem_data = data.allocatedAmount;
            setAllocatedAmount(mem_data);
            setAllocatedLoading(true);
        })
        .catch(err => {
            console.log("fail to Load data")
        })
    },[]);
  
    if(isMemberLoading===true && isAmountAllocatedLoading===true){
        let flt_members = [];

        // get the ids of allocated amount members
        const allocatedAmount_ID = allocatedAmount.map(el => el._id_member)
        // Search in the member list
        memeber.filter(function(el){

            // if matched then
            if(allocatedAmount_ID.includes(el._id)){
                // get the id from the filtr_mem
                const mem_ID= allocatedAmount_ID[allocatedAmount_ID.indexOf(el._id)];
                
                // get all the info of the allocated member list
                const mem = allocatedAmount.filter(function (el){
                    if(el._id_member===mem_ID){
                        return el
                    }
                })
                // loop in mem and push to the array
                mem.map(elm => (
                    flt_members.push({
                    name:el.name,
                    village:el.village_Name,
                    date:elm.date.substring(0,10),
                    amount: elm.amount,
                    heads: elm.assign_by.join(),
                    reason:elm.reason,
                })
                ))
      
            }
        })
        setPageLoading(false);
        setFinalList(flt_members);
        setIsMemeberLoading(false);
        setAllocatedLoading(false);

    }
    
    // get List of Allocated Amount

    if(pageLoading===true){

       return(<div>Loading</div>)
        
    }
    else{
        return (
        <div style={{marginTop:"10px"}} className="tableContainor">
                <div className="tableHolder">
                     <Table className="tbs" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                       
                        
                        <th style={{textAlign:'right'}}>وجہ</th>
                        <th style={{textAlign:'right'}}>سرپرستی</th>
                        <th style={{textAlign:'right'}}>رقم</th>
                        <th style={{textAlign:'right'}}>تاریح</th>

                        <th style={{textAlign:'right'}}>محلہ</th>

                        <th style={{textAlign:'right'}}>نام</th>
                         <th style={{textAlign:'right'}}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {final_list.map((el,key) =>(
                            <tr key={key}>                 
                                <td style={{textAlign:'right'}}>{el.reason}</td>

                                <td style={{textAlign:'right'}}>{el.heads}</td>
                                <td style={{textAlign:'right'}}>{el.amount}</td>
                                
                                <td style={{textAlign:'right'}}>{el.date}</td>

                                <td style={{textAlign:'right'}}>{el.village}</td>
                                <td style={{textAlign:'right'}}>{el.name}</td>
                                <td style={{textAlign:'right'}}>{key+1}</td>
                            </tr>

                        ))}      
                      
                        
                      
                        
                    </tbody>
                </Table>
                </div>
               
            </div>
    );
    }

    
}

export default Donations;