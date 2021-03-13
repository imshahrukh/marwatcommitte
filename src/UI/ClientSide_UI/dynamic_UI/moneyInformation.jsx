import React from 'react';
import {Dropdown,DropdownButton,Table} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import {apiURL} from './../../apiURL'
// import {submission} from './../../../data/submitted'
import {members} from './../../../data/members'


function MoneyInformation(props) {
      const getDate = () =>{
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        return utc;
    }
        const year = ["2020","2021","2022","2023","2024"];


    const monthName = ["دسمبر","نومبر","اکتوبر","ستمبر","اگست","جولائ","جون","مئ","اپریل","مارچ","فروری","جنوری"].reverse()
    // const monthEng = ['jan','feb']
    const villagNameArray = ["دلوخیل","اباخیل","ناورخیل","آذیذان","وانڈا"]

    const [villageName,setVillageName] = useState(villagNameArray[0]);
    const [month,setMonth] = useState(monthName[0]);
    const [deafultYear,setDefaultYear] = useState(getDate().substring(0,4));
    const [villages_NAME,setVillagesNAME] =useState([])
    const [isloadingMemeber,setIsLoadingMember] = useState(true);
    const [isloadingAmount,setIsLoadingAmount] = useState(true);
    const [allMember,setAllMember] =useState(members);
    const [allAmount,setAllAmount] =useState([]);
    var [x,setx]= useState(0);
    const [filteringDone,setFilteringDone] = useState(false)
 
    const [amountSubmiited,set_AmountSubmitted]= useState([])
    const [amountnotSubmitted,set_AmountNotSubmitted]= useState([])

    const filterAmount = (months,deafultYear) =>{
            // get List of the current month(0,7)
            let month_index = monthName.indexOf(months)+1;
            if(month_index<10){
                month_index = "0"+month_index;
            }
            const date = deafultYear+"-"+month_index;
            // eslint-disable-next-line array-callback-return
            const filter_amount = allAmount.filter(function(el) {
                const obj = el.submission_date+"";
                if(obj.substring(0,7) === date){
                    return el;
                }
            })
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
            
                const notSubmittedAmount = flt_members.filter(el => !(_id_amount.includes(el._id)))
                const SubmittedAmount = flt_members.filter(el => (_id_amount.includes(el._id)))
                return {
                    submitted: SubmittedAmount,
                    notSubmitted:notSubmittedAmount
                }
             
                // setCheckBoxes(filter_membres.map((el,key) => console.log(key))) 
            }
            else{ 
                
                 return {
                    submitted: [],
                    notSubmitted:flt_members
                }

            }
        }

    // data of current Month
    // read the cureent month
    // get the data of cureent Month and pass to the user hook
    // const [user,setUser] =useState(submission[2020].jan)

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
                    setVillageName(villages_n[0])
                    // store the array of village
                    setVillagesNAME(villages_n)

                    setIsLoadingMember(false);              
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
        },[]);
        
        if(isloadingMemeber===false && isloadingAmount===false){
         
            setFilteringDone(true)
            //    getFinal_filterData();
        }
         if(filteringDone===true && x===0 ){
            setIsLoadingAmount(true);
            setIsLoadingMember(true);
            const  filter_amount = filterAmount(month,deafultYear);
            const filter_members=filterMemberByVillage(villageName);
            const datas = getFinal_filterData(filter_amount,filter_members);
       
            
            // console.log(datas.notSubmitted)
            set_AmountSubmitted(datas.submitted);
            set_AmountNotSubmitted(datas.notSubmitted);
        
            setx(1);
        }
    const selectVillage = (Villagename) =>{
         const  filter_amount = filterAmount(month,deafultYear);
            const filter_members=filterMemberByVillage(Villagename);
            const datas = getFinal_filterData(filter_amount,filter_members);
            
            setVillageName(Villagename)
            set_AmountSubmitted(datas.submitted);
            set_AmountNotSubmitted(datas.notSubmitted);
    }

    const selectMonth = (name) => {
        
        const  filter_amount = filterAmount(name,deafultYear);
        const filter_members=filterMemberByVillage(villageName);
        const datas = getFinal_filterData(filter_amount,filter_members);
            
        setMonth(name);
        set_AmountSubmitted(datas.submitted);
        set_AmountNotSubmitted(datas.notSubmitted);
    }
    const setYear = (year) =>{
        const  filter_amount = filterAmount(month,year);
        const filter_members=filterMemberByVillage(villageName);
        const datas = getFinal_filterData(filter_amount,filter_members);
            
        setDefaultYear(year);
        set_AmountSubmitted(datas.submitted);
        set_AmountNotSubmitted(datas.notSubmitted);
    }
    
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
                {/* City Name */}               
                <DropdownButton className="DropDown" id="dropdown-basic-button" title={month}>
                     {monthName.map((name)=>
                    <Dropdown.Item key={name} onClick ={() =>{
                        selectMonth(name)
                    }}>{name}</Dropdown.Item>
                )}
          
                </DropdownButton>
                <p className="ComboTags tag">مہینہ</p>

                {/* Person Name */}

                <DropdownButton id="dropdown-basic-button" title={villageName}>
                        {villages_NAME.map((name)=>
                    <Dropdown.Item key={name} onClick ={() =>{
                        selectVillage(name)
                    }}>{name}</Dropdown.Item>
                )}   
                </DropdownButton>

                <p className="ComboTags tag">محلہ</p>
                


            </div>
            <div className="tableContainor">
                <div className="tableHolder">
                     <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                       
                        
                        <th style={{textAlign:'right'}}>رقم</th>
                        <th style={{textAlign:'right'}}>محلہ</th>
                        <th style={{textAlign:'right'}}>Month</th>

                        <th style={{textAlign:'right'}}>نام</th>
                         <th style={{textAlign:'right'}}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {amountSubmiited.map((element,key) => 
                            <tr key={key}>
                                <td style={{textAlign:'right'}}>500</td>
                                <td style={{textAlign:'right'}}>{element.village_Name}</td>
                                <td style={{textAlign:'right'}}>{month}</td>
                                <td style={{textAlign:'right'}}>{element.name}</td>
                                <td style={{textAlign:'right'}}>{key+1}</td>
                            </tr>
                        )}
                        {amountnotSubmitted.map((element,key) => 
                            <tr key={key}>
                                <td style={{textAlign:'right'}}>0</td>
                                <td style={{textAlign:'right'}}>{element.village_Name}</td>
                                <td style={{textAlign:'right'}}>{month}</td>

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

export default MoneyInformation;


                                // Alog of the current file
// store the init month in the hook
// store the init village in the hook

// display all the data\


// select the village
// select the month
    // convernt the urdu month to english using the
    
// filter by the village name on selecting the village 