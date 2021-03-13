/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Dropdown,DropdownButton,Table,Form,Button} from 'react-bootstrap'
import {useState,useEffect } from 'react'
import axios from 'axios';
import {useNavigate  } from "react-router-dom";
import getToken from './../../../useLoginState'
import {members} from './../../../data/members'
import {apiURL} from './../../apiURL'
// ------------------------ steps --------------------------------
// Inite the Hooks

// filter the amount data by filterAmount Function (date selected by the user)
    // get the year and month
    // search the year and monthe
    // filter the (allAmount) and store to (filter_amounts)
// filter the member by village
    // select the village
    // filter the (allMember) by village name (village(hook))
    // save to (filter_membres)

// call all the method once
    // if the both request scefully executed then 
    // call both methods and set (filteringDone(true)) so that we can render it on UI at the same time set x=1 so that this condition dont exec repeativly bx it casuing error
    
// call all the methon state change
    // for each hook call the all the function and pass the parameter



    // sequence
        // Method
            // filterAmount
            // filterMemberByVillage
            // getFinal_filterData
        // useEffect
            // member
            // amount
        // condition
            // check if the both api success
            // insure that condition exe once
        // Update hooks
            // Year
            // Month
            // Village
function adminAddAmount(props) {
    const getDate = () =>{
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        return utc;
    }
    const year = ["2020","2021","2022","2023","2024"];
    const monthName = ["دسمبر","نومبر","اکتوبر","ستمبر","اگست","جولائ","جون","مئ","اپریل","مارچ","فروری","جنوری"].reverse()
    // const d  =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deafultYear,setDefaultYear] = useState(getDate().substring(0,4));
    const [month,setMonth] = useState(monthName[0]);
    const [villages_NAME,setVillagesNAME] =useState([])
    const [village,setVillage] = useState("");
    const [isloadingMemeber,setIsLoadingMember] = useState(true);
    const [isloadingAmount,setIsLoadingAmount] = useState(true);
    const [allMember,setAllMember] =useState(members);
    const [allAmount,setAllAmount] =useState([]);
    const  [filter_membres,setFilter_Member] =useState();
    var [filter_amounts,setFilter_Amounts]=useState() ;
    var [x,setx]= useState(0);
    const [final_filterAmount,set_finalFilter_Amount]= useState([])
    const [filteringDone,setFilteringDone] = useState(false)
    let accepted = false;
    const [amount,setAmount] = useState('');
    const res_amount = 500;
    const navigate = useNavigate();


        
        const filterAmount = (months,deafultYear) =>{
            // get List of the current month(0,7)
            console.log(months)
            let month_index = monthName.indexOf(months)+1;
            if(month_index<10){
                month_index = "0"+month_index;
            }
            const date = deafultYear+"-"+month_index;
            console.log(date);
            // eslint-disable-next-line array-callback-return
            const filter_amount = allAmount.filter(function(el) {
                const obj = el.submission_date+"";
                if(obj.substring(0,7) === date){
                    return el;
                }
            })
            console.log(filter_amount)
            return filter_amount;

        
        }
        const filterMemberByVillage = (selected_village) =>{
            // eslint-disable-next-line array-callback-return
            const filter_members = allMember.filter(function(el) {
                if(el.village_Name === selected_village){
                    return el;
                }
            })
            return filter_members;
            // setFilter_Members(filter_members)
        
        }
        const getFinal_filterData = (flt_amounts,flt_members) =>{
           
            var _id_amount ;
            if(flt_amounts.length !== 0 ){
                _id_amount = flt_amounts.map(el => el._id_memeber);
            
                const datas = flt_members.filter(el => !(_id_amount.includes(el._id)))
                return datas
             
            }
            else{ 
                return flt_members;
            }
        }
        const getFinal_filterData_id = (_id) =>{
           
            // in the final filter data if the this amount exist remove it
            const datas = final_filterAmount.filter(el => !(_id.includes(el._id)))
            set_finalFilter_Amount(datas);  
          
             
        }
        // get the list of the members.....
        useEffect(() => {
            axios.get(`${apiURL}/v1/member`)
                .then(res => {
                    // get data from json
                    const data = res.data.data;
                    const mem_data = data.member;
                    setAllMember(mem_data);  
            
                    // get all the village from the member and remove the duplicate
                    var villages_n = mem_data.map(data => data.village_Name);
                    villages_n = [...new Set(villages_n)];
                    // -----> set VALUES to HOOKS <-------
                    // get the first Villge
                    setVillage(villages_n[0])
                    // store the array of village
                    setVillagesNAME(villages_n)

                    setIsLoadingMember(false);              
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
                    setAmount(mem_data[0].committe_amount)
                    console.log(mem_data[0].committe_amount)
                               
                })
                .catch(err => {
                    console.log("fail to Load data")
                })

        },[]);
    // get All amount
        useEffect(() => {
            axios.get(`${apiURL}/v1/submittedAmount`)
                .then(res => {
                    // get data from json
                    const data = res.data.data;
                    const all_amount = data.member;
                
                    setAllAmount(all_amount);
                    // call the method to fillter the data
                    setIsLoadingAmount(false);
                })
                .catch(err => {
                    console.log("fail to Load data")
                })
        },[month,village]);
     
    // conditions
    
        if(isloadingMemeber===false && isloadingAmount===false){
         
            setFilteringDone(true)
            //    getFinal_filterData();
        }
        if(filteringDone===true && x===0 ){
            setIsLoadingAmount(true);
            setIsLoadingMember(true);
            const  filter_amount = filterAmount(month,deafultYear);
            const filter_members=filterMemberByVillage(village);
            const datas = getFinal_filterData(filter_amount,filter_members);
            
            setFilter_Amounts(filter_amount);
            setFilter_Member(filter_members);
            set_finalFilter_Amount(datas);
            
            setx(1);
        }
    // update the hooks 
        const setYear = (year) =>{
            setDefaultYear(year);
            const  filter_amount = filterAmount(month,year);
            const filter_members=filterMemberByVillage(village);
            const datas = getFinal_filterData(filter_amount,filter_members);
            
            setFilter_Amounts(filter_amount);
            setFilter_Member(filter_members);
            set_finalFilter_Amount(datas);
        }
        const selectMonth = (name) => {
           
            setMonth (name)
            const  filter_amount = filterAmount(name,deafultYear);
            const filter_members=filterMemberByVillage(village);
            const datas = getFinal_filterData(filter_amount,filter_members);
            
            setFilter_Amounts(filter_amount);
            setFilter_Member(filter_members);
            set_finalFilter_Amount(datas);
        }
        const selectEmp = (name) => {
            setVillage (name)
            const  filter_amount = filterAmount(month,deafultYear);
            const filter_members=filterMemberByVillage(name);
            const datas = getFinal_filterData(filter_amount,filter_members);
            
            setFilter_Amounts(filter_amount);
            setFilter_Member(filter_members);
            set_finalFilter_Amount(datas);

        }
        const addFunctionAmount= async (url,data) =>{
           await axios.patch(url,data);          
        }
        const getData = async (url,sub_Data) =>{
            let res = await axios.post(url,sub_Data);
            let {status} = res.data;
           
            const temp_amount= amount+res_amount;
            if(status==="success"){
                
                const url = `${apiURL}/v1/amount/6035e2aea95ade2cf0053857`;
                // data to update
                const d = {
                    committe_amount: temp_amount,
                }
                // method to send post request
                await addFunctionAmount(url,d)


               accepted=true
            }
            else{
                accepted=false
            }
            setAmount(temp_amount);

        }
        const oncheck_BOX = async(_id) =>{
            
            const month_index = monthName.indexOf(month)+1;
            const day = getDate().substring(8,10);
            const date = deafultYear +"-"+ month_index+"-"+ day;

            const data = { _id_memeber: _id, submission_date:date};
            const url = `${apiURL}/v1/submittedAmount`;
            await getData(url,data)
            if(accepted===true){
                getFinal_filterData_id(_id)
                accepted=false;
            }
            

        }
        if(getToken()===false){
            navigate('/login');
        }
        if(filteringDone===true){
            
              return (
        <div className="moneyInformation-Containor addAmountComboBx">
            
            
            <div className="comnoBox">
                 <DropdownButton id="dropdown-basic-button" title={deafultYear}>
                        {year.map((years,key)=>
                    <Dropdown.Item key={key} onSelect ={() =>{
                        setYear(years)
                    }}>{years}</Dropdown.Item>
                )}   
                </DropdownButton>

                <p className="ComboTags tag">سال</p>
                 <DropdownButton className="DropDown" id="dropdown-basic-button" title={month}>
                     {monthName.map((name)=>
                    <Dropdown.Item key={name} onClick ={() =>{
                        selectMonth(name)
                    }}>{name}</Dropdown.Item>
                )}
          
                </DropdownButton>

                <p className="ComboTags tag">مہینہ</p>
                 <DropdownButton id="dropdown-basic-button" title={village}>
                        {villages_NAME.map((name,key)=>
                    <Dropdown.Item key={key} onSelect ={() =>{
                        selectEmp(name)
                    }}>{name}</Dropdown.Item>
                )}   
                </DropdownButton>

                <p className="ComboTags tag">محلہ</p>
                
            </div>
            <div className="tableContainor">
                <div className="tableHolder">
                     <Table className="tbs" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                       
                        
                        <th style={{textAlign:'right'}}>Add</th>
                        <th style={{textAlign:'right'}}>محلہ</th>

                        <th style={{textAlign:'right'}}>نام</th>
                         <th style={{textAlign:'right'}}>#</th>
                        </tr>
                    </thead>
                    <tbody>

                     {final_filterAmount.map((element,key) =>
                           
                            <tr key={key}>
                       
                                <td style={{textAlign:'right'}}>
                                     <Button variant="primary"  size="md" onClick = {()=>{
                                        oncheck_BOX(element._id)
                                     }}active>
                                        Submit Amount
                                    </Button>
                                    
                                  
                                </td>
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
        else{return(<div>Loading</div>)}
        
      
    }
    

export default adminAddAmount;

// use too many state now its time ot reduce the number io states