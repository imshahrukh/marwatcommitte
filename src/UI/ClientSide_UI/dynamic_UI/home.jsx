import React from 'react';
import {useState,useEffect } from 'react'
import axios from 'axios';
import {apiURL} from './../../apiURL'

// const unitsInUrdu = ["ہزار","لاکھ"];
// const getAmountInUrdu = (amount) =>{
//     let _amount=amount+"";
//     if(_amount.length===4){
//          const _thousand= _amount.substring(0,1);
//             return ` ${unitsInUrdu[0]} o${_thousand}` ;   
//     }
//     if(_amount.length===5){
//         const _thousand= _amount.substring(0,2);
//         const _remaing= _amount.substring(2,5);
//         return `${_remaing} ${unitsInUrdu[0]} o${_thousand}` ;

//     }
//     if(_amount.length===6){
//         const _lack = _amount.charAt(0);
//         console.log(unitsInUrdu[1]+" "+_lack)

//         const _thousand= _amount.substring(1,3);
//         console.log(_thousand)

//         const _remaing= _amount.substring(3,6);
//         console.log(_remaing)
//         return `${_remaing} ${unitsInUrdu[1]} ${_thousand} ${unitsInUrdu[0]}t ${_lack}` ;

//     }
//     if(_amount.length===7){
//          const _lack = _amount.substring(0,2);
//         console.log(console.log(unitsInUrdu[0]+" "+_lack))

//         const _thousand= _amount.substring(2,4);
//         console.log(unitsInUrdu[1]+_thousand )

//         const _remaing= _amount.substring(4,7);
//         console.log(_remaing)

//         return `${_remaing} ${unitsInUrdu[1]} ${_thousand} ${unitsInUrdu[0]}t ${_lack}` ;
//     }
// }


function Home(props) {
        const [amountAnnual,setAmountAnnual]= useState('');
        const [amountMonthly,setAmountMontly]= useState('');
         useEffect(() => {
            axios.get(`${apiURL}/v1/amount`)
                .then(res => {
                    // get data from json
                    const data = res.data.data;
                    const mem_data = data.amounts;

                    const montly = mem_data[0].committe_amount; 
                    const yearly = mem_data[0].functions_amount;

                    setAmountMontly(montly)
                    setAmountAnnual(yearly)
                               
                })
                .catch(err => {
                    console.log("fail to Load data")
                })

        },[]);
    return (
        
            <div >
                <div className="current_amount">{(amountMonthly)}  : <span className="current_amount"> موجودہ رقم </span></div>
                <div className="current_amount" >{(amountAnnual)}  : <span className="current_amount">  تقریب رقم </span></div>
            </div>
    
    );
}

export default Home;