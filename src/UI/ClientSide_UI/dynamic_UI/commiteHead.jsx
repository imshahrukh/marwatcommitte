import React from 'react';
import {Table} from 'react-bootstrap'
function CommitHeads(props) {

    
    return (
        <div className="moneyInformation-Containor">
            
            <div style={{marginTop:'15px'}}></div>
        
            <div className="tableContainor">
                <div className="tableHolder">
                     <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                       
                        <th style={{textAlign:'right'}}>pic</th>
                        <th style={{textAlign:'right'}}>سٹیٹس</th>
                        <th style={{textAlign:'right'}}>موبایل نمبر</th>
                        <th style={{textAlign:'right'}}>محلہ</th>

                        <th style={{textAlign:'right'}}>نام</th>
                         <th style={{textAlign:'right'}}>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                       
                        <td style={{textAlign:'right'}}>
                            <div className="picHolder">
                                <img src={""} alt="test" />
                            </div>
                        </td>
                        <td style={{textAlign:'right'}}>صدر </td>
                        <td style={{textAlign:'right'}}>0330-527505</td>
                        <td style={{textAlign:'right'}}>دلوخیل</td>
                        <td style={{textAlign:'right'}}> فضل الرحمن</td>
                         <td style={{textAlign:'right'}}>1</td>
                        </tr>


                         <tr>
                        <td style={{textAlign:'right'}}>
                             <div className="picHolder">
                                <img src={""} alt="test" />
                           

                        </div>
                        </td>
                       
                        <td style={{textAlign:'right'}}>جنرل سیکرٹری</td>

                        <td style={{textAlign:'right'}}>0313-9050797</td>

                        <td style={{textAlign:'right'}}>بیگو خیل</td>
                        <td style={{textAlign:'right'}}> امیر نواز خان</td>
                         <td style={{textAlign:'right'}}>2</td>
                        </tr>



                         <tr>
                        <td style={{textAlign:'right'}}> <div className="picHolder">
                                <img src={""} alt="test" />
                            </div></td>

                        <td style={{textAlign:'right'}}>میڈیا کوارڈنیٹر</td>
                       
                        <td style={{textAlign:'right'}}>0313-55555555</td>

                        <td style={{textAlign:'right'}}> تاجہ زئی</td>
                        <td style={{textAlign:'right'}}>اختر منیر خان</td>
                         <td style={{textAlign:'right'}}>2</td>
                        </tr>


                         
                      
                        
                    </tbody>
                </Table>
                </div>
               
            </div>

            {/* div*/}
            


        </div>
    );
}

export default CommitHeads;