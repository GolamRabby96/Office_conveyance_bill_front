import moment from "moment";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const RejectBill = () => {
    const getUser = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, setConveyanceData] = useState([]);
    const [reLoad, setReload] = useState(false);

    console.log(conveyanceData);


    useEffect(() => {
        handlePendingData()
    }, [reLoad])

    const handlePendingData = async () => {
        const responce = await fetch(`http://localhost:5000/api/rejectList/${getUser.user_id}`, {
            credentials: 'include'
        });
        if (!responce.ok) {
            throw new Error(`HTTP error! status:${responce.status}`);
        }
        const data = await responce.json();
        setConveyanceData(data.data);
    }






    const handleRejectBill = (id) => {
        console.log('this is id chekc',id);

        fetch(`http://localhost:5000/api/deleteConveyance/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                alert('process done');
                setReload(!reLoad);
            })
    }

    return (
        <>
            <div className="container-fluid headerCover">
                <div className="row">
                    <div className="col-md-12 rounded">
                        <p className="btn btn-info mb-3 shadow px-5">Reject Bill</p>
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
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
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
                                    <th scope="col" className="text-start">Reject Note</th>
                                    <th scope="col" className="text-start">Total</th>
                                    <th scope="col" className="text-center">Edit</th>
                                    <th scope="col" className="text-center">Del</th>

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
                                            <td className="text-center conveyanceAmount">{con.conveyance_amount}/=</td>

                                            <td>{con.holiday_hour}</td>
                                            <td className="text-center holidayAmount">{con.holiday_amount}/=</td>

                                            <td>{con.overtime_from}-{con.overtime_to}</td>
                                            <td>{con.overtime_hour}</td>
                                            <td className="text-center overtimeAmount">{con.overtime_amount}/=</td>

                                            <td className="text-center dinnerAmount">{con.Dinner_amount}/=</td>
                                            
                                            <td className="text-start">{con.remarks} </td>
                                            <td className="text-start rejectBillNote">{con.reject_note} </td>
                                            <td className="text-start">{con.conveyance_amount + con.holiday_amount + con.overtime_amount + con.Dinner_amount}/=</td>
                                            <td className='rejectButton'><Link to={`/editConveyance/${con._id}`}><FaEdit type="button" ></FaEdit></Link></td>
                                            <td className='acceptButton'  data-bs-toggle="modal" data-bs-target={`#modal-${con._id}`}><AiTwotoneDelete /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <>
                    {/* <!--Reject Modal --> */}
                    {
                        conveyanceData?.map((con, i) => (

                            <div class="modal fade" id={`modal-${con._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={`modal-${con._id}`}>
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel">Are you sure !</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="col-md-12 col-sm-12 mb-2">
                                                <p className="bg-danger text-center rounded shadow text-white">Kindly confirm if you would like this to be removed.</p>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Not now</button>
                                            <button type="button" onClick={()=>handleRejectBill(con._id)} class="btn btn-danger shadow" data-bs-dismiss="modal">Confirmed</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            </div>
        </>
    )
}