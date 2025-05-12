import moment from "moment";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { IoExitSharp } from "react-icons/io5";
import { CgLayoutGrid } from "react-icons/cg";
import { MdOutlineDeleteForever } from "react-icons/md";

export const RejectHolidayBill = () => {
    const getUser = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, setConveyanceData] = useState([]);
    const [approvedId, setApprovedId] = useState([]);
    const [reLoad, setReload] = useState(false);
    const [totalID, SetTotalID] = useState([]);
    const [isChecked, setIschecked] = useState(false);
    const [rejectNote, setRejectionNote] = useState('');
    const [rejectId, setRejectId] = useState('');

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
        console.log(data);
        let totaldata = [];

        data?.data.map(id => {
            totaldata.push(id._id);
        })
        SetTotalID(totaldata);
    }

    const handleFormData = (value) => {
        const demoId = [...approvedId];
        let findData = demoId.includes(value);

        if (findData) {
            let filterData = demoId.filter(filterValue => filterValue != value);
            setApprovedId(filterData);
            setIschecked(false)
        }
        else if (!findData) {
            demoId.push(value);
            setApprovedId(demoId);

        }
    }

    const handleAllSelectData = (condition) => {
        console.log(condition);
        if (condition) {
            setApprovedId(totalID);
            setIschecked(condition);
        } else {
            setApprovedId([]);
            setIschecked(condition);
        }

    }

    const handleSelectedData = async () => {

        let totalData = { ...[approvedId], next_responsible_person: getUser.next_responsible_person, next_responsible_person_id: getUser.next_responsible_person_id, approver: { approver_name: getUser.user_name, approver_id: getUser.user_id, approver_designation: getUser.user_designation } };
        fetch('http://localhost:5000/api/updateMultipleId', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(totalData),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                setApprovedId([]);
                alert('process done');
                setReload(!reLoad);
            })
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
                setReload(!reLoad);
                setRejectId('');
            })
    }

    return (
        <>
            <div className="container-fluid headerCover">
                <div className="row">
                    <div className="col-md-12 rounded">
                        <p className="btn btn-info mb-3 shadow px-5">Reject Holiday Bill</p>
                        <table class="table table-bordered shadow tableCss">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col" className="text-center">SL</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Preparer by</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Ticket Id</th>
                                    <th scope="col" className="text-start">POP/Customer Name</th>
                                    <th scope="col">Transport</th>
                                    <th scope="col" className="text-center">Amount</th>
                                    <th scope="col" className="text-start">Remarks</th>
                                    <th scope="col" className="text-start">Reject Note</th>
                                    <th scope="col" className="text-center">Edit</th>
                                    <th scope="col" className="text-center">Delete</th>
                                    {/* <th scope="col" className="text-center">
                                        <div>
                                            <span role="button" onClick={() => handleAllSelectData(!isChecked)}>All</span>
                                        </div>
                                    </th> */}

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
                                            <td className="text-center">{con.conveyance_amount}</td>
                                            <td className="text-start">{con.remarks} </td>
                                            <td className="text-start bg-danger text-white">{con.reject_note} </td>
                                            <td className='acceptButton' data-bs-toggle="modal" data-bs-target={`#modal-${con._id}`}><IoExitSharp type="button" onClick={() => setRejectId(con._id)} /></td>
                                            <td className=' rejectButton' >
                                                <MdOutlineDeleteForever />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {approvedId.length > 0 && <div className="col-md-12 col-sm-12 mb-3 mt-5">
                        <div className="submitButton mx-2">
                            <button onClick={handleSelectedData} >Approved {approvedId.length} {approvedId.length > 1 ? 'Items' : 'Item'}</button>
                        </div>
                    </div>}
                </div>

                <>
                    {/* <!--Reject Modal --> */}
                    {
                        conveyanceData?.map((con, i) => (

                            <div class="modal fade" id={`modal-${con._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={`modal-${con._id}`}>
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Reject Note</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="col-md-12 col-sm-12 mb-2">
                                                <label for="reject_note" className="form-label">Describe the specifics of the rejection.</label>
                                                <textarea type="text" name="reject_note" className="form-control w-100" id="reject_note" placeholder='Details about rejection' onChange={(e) => setRejectionNote(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Not now</button>
                                            <button type="button" onClick={handleRejectBill} class="btn btn-danger">Reject</button>
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