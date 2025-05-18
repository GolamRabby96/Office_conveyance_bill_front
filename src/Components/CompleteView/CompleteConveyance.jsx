import moment from "moment";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { IoExitSharp } from "react-icons/io5";
import { CgLayoutGrid } from "react-icons/cg";
import { CombinedButton } from "../CombinedApproved/CombinedButton";

export const CompleteConveyance = ({ transferData = [], cmpt, reLoadComponent, setReloadComponent }) => {
    const [reLoad, setReload] = useState(false);
    const [rejectNote, setRejectionNote] = useState('');
    const [rejectId, setRejectId] = useState('');
    const [reload, setRelead] = useState(false);
    const [conveyanceData, SetConveyanceBill] = useState([]);

    useEffect(() => {
        GetConveyanceData();
    }, [reload, transferData?.id])


    const GetConveyanceData = async () => {

        if (transferData.id) {
            fetch(`http://localhost:5000/api/getConveyance/${transferData?.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(transferData),
            })
                .then((res) => res.json())
                .then((data) => {
                    SetConveyanceBill(data.data);
                    console.log(data.data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            console.log('input field is empty');
        }
    }



    const handleRejectBill = () => {

        fetch(`http://localhost:5000/api/rejectConvenceBill/${rejectId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: rejectNote }),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                alert('process done');
                setReloadComponent(!reLoadComponent);
                setRejectId('');
                setRelead(!reload);
            })
    }

    return (
        <>
            <div className="row mb-5">
                <div className="col-md-12 mt-5 rounded">
                    <table className="table table-bordered shadow tableCss">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col" colSpan="5" className="conveyanceAmount">Conveyance</th>
                                <th scope="col" colSpan="2" className="holidayAmount">Holiday</th>
                                <th scope="col" colSpan="3" className="overtimeAmount">Overtime</th>
                                <th scope="col" className="dinnerAmount">Dinner Bill</th>
                                <th scope="col"></th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
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
                                <th scope="col" className="text-center">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(conveyanceData) && conveyanceData?.map((con, i) => (
                                    <tr className="" key={`modal-${con._id}`}>
                                        <td className="text-center">{i + 1}</td>
                                        <td >{moment(con.date).format('DD MM YY')}</td>
                                        <td>{con.preparer_by}-({con.preparer_Zone})</td>
                                        <td>{con.start_Time}-{con.end_time}</td>
                                        <td>{con.from_location}-{con.to_location}</td>
                                        <td>{con.ticket_id}</td>
                                        <td className="text-start">{con.pop_or_customer_name}</td>
                                        <td>{con.transport}</td>
                                        <td className="text-center conveyanceAmount">{con.conveyance_amount > 0 ? con.conveyance_amount + "/=" : "-"}</td>

                                        <td>{con.holiday_hour ? con.holiday_hour + "H" : "-"}</td>
                                        <td className="text-center holidayAmount">{con.holiday_amount > 0 ? con.holiday_amount + "/=" : "-"}</td>

                                        <td>{con.overtime_from}-{con.overtime_to}</td>
                                        <td>{con.overtime_hour ? con.overtime_hour + "H" : "-"}</td>
                                        <td className="text-center overtimeAmount">{con.overtime_amount > 0 ? con.overtime_amount + "/=" : "-"}</td>


                                        <td className="text-center dinnerAmount">{con.Dinner_amount > 0 ? con.Dinner_amount + "/=" : "-"}</td>


                                        <td className="text-start">{con.remarks} </td>
                                        <td className="text-start">{con.conveyance_amount + con.holiday_amount + con.overtime_amount + con.Dinner_amount}/=</td>
                                        <td className='rejectButton' data-bs-toggle="modal" data-bs-target={`#modal-${con._id}`}><IoExitSharp type="button" onClick={() => setRejectId(con._id)} /></td>
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
                    Array.isArray(conveyanceData) && conveyanceData?.map((con, i) => (

                        <div className="modal fade" id={`modal-${con._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={`modal-${con._id}`}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Reject Note</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="col-md-12 col-sm-12 mb-2">
                                            <label for="reject_note" className="form-label">Describe the specifics of the rejection.</label>
                                            <textarea type="text" name="reject_note" className="form-control w-100" id="reject_note" placeholder='Details about rejection' onChange={(e) => setRejectionNote(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Not now</button>
                                        <button type="button" onClick={handleRejectBill} className="btn btn-danger" data-bs-dismiss="modal">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </>
            <CombinedButton />

        </>
    )
}