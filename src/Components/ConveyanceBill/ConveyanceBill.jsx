import React, { useState } from 'react'
import { BsPlusCircleDotted } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import moment from 'moment';
import secureLocalStorage from 'react-secure-storage';
import { IoExitSharp } from "react-icons/io5";
import { CgLayoutGrid } from "react-icons/cg";


export const ConveyanceBill = () => {
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, SetConveyanceBill] = useState([]);
    const [formData, SetFormData] = useState({});

    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }

    const handleConveyanceData = async (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/getConveyance/${userData.user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                SetConveyanceBill(data.data)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    return (
        <>
            <div className='container-fluid headerCover'>
                <div className="row">

                    <div className="col-md-12">
                        <form onSubmit={handleConveyanceData} className="bill-history-bar shadow rounded p-3">
                            <h5>Conveyance Bill</h5>
                            <div className='billing-month-select'>
                                <select onChange={handleFormData} name="month" id="month" className='mx-2 px-2 rounded'>
                                    <option value="">Chosse Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                                <select onChange={handleFormData} name="year" id="year" className='rounded'>
                                    <option value="">Chosse Year</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                                <button type='submit' className='btn btn-sm bg-info px-2 mx-2 shadow'>Filter</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-12 mt-5 rounded">
                        <table class="table table-bordered shadow tableCss">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col" colspan="5" className="conveyanceAmount">Conveyance</th>
                                    <th scope="col" colspan="2" className="holidayAmount">Holiday</th>
                                    <th scope="col" colspan="3" className="overtimeAmount">Overtime</th>
                                    <th scope="col" className="dinnerAmount">Dinner Bill</th>
                                    <th scope="col"></th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Next</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr className="text-center">
                                    <th scope="col" className="text-center">SL</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Preparer by</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Form-To</th>
                                    <th scope="col">Ticket Id</th>
                                    <th scope="col">Destination</th>
                                    <th scope="col">Transport</th>
                                    <th scope="col" className="text-center conveyanceAmount">Amount</th>
                                    <th scope="col" className="text-center">Hour</th>
                                    <th scope="col" className="text-center holidayAmount">Amount</th>
                                    <th scope="col">Time</th>
                                    <th scope="col" className="text-center">Hour</th>
                                    <th scope="col" className="text-center overtimeAmount">Amount</th>
                                    <th scope="col" className="text-center dinnerAmount">Amount</th>
                                    <th scope="col" className="text-start">Remarks</th>
                                    <th scope="col" className="text-start">Amount</th>
                                    <th scope="col">Approver</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    conveyanceData?.map((con, i) => (
                                        <tr className="text-center" key={`modal-${con._id}`}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{moment(con.date).format('L')}</td>
                                            <td>{con.preparer_by}-({con.preparer_Zone})</td>
                                            <td>{con.start_Time}-{con.end_time}</td>
                                            <td>{con.from_location}-{con.to_location}</td>
                                            <td>{con.ticket_id}</td>
                                            <td class="text-start">{con.pop_or_customer_name}</td>
                                            <td>{con.transport}</td>
                                            <td className="text-center conveyanceAmount">{con.conveyance_amount > 0 ? con.conveyance_amount+"/=" : "-"}</td>

                                            <td>{con.holiday_hour ? con.holiday_hour+"H":"-"}</td>
                                            <td className="text-center holidayAmount">{con.holiday_amount >0 ? con.holiday_amount +"/=" : "-"}</td>

                                            <td>{con.overtime_from}-{con.overtime_to}</td>
                                            <td>{con.overtime_hour? con.overtime_hour+"H":"-"}</td>
                                            <td className="text-center overtimeAmount">{con.overtime_amount >0 ? con.overtime_amount+"/=":"-"}</td>


                                            <td className="text-center dinnerAmount">{con.Dinner_amount>0? con.Dinner_amount+"/=":"-"}</td>


                                            <td className="text-start">{con.remarks} </td>
                                            <td className="text-start">{con.conveyance_amount + con.holiday_amount + con.overtime_amount + con.Dinner_amount}/=</td>
                                            <td className='rejectButton'>{con.next_responsible_person}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>


                    {/* ------------------------------------------- */}
                    <div className="add-button-bottom" >
                        <BsPlusCircleDotted />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConveyanceBill
