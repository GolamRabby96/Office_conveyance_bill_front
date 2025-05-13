import moment from "moment";
import React, { useDebugValue, useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";


export const EditConveyanceBill = () => {
    const navigat = useNavigate();
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || "[]");
    const { id } = useParams();
    const [dateValue, setDate] = useState(new Date());
    const [collectData, SetData] = useState({});

    console.log(collectData);
    
    useEffect(() => {
        handleConveyanceBill();
    }, [])

    const handleConveyanceBill = async (req, res) => {
        const responce = await fetch(`http://localhost:5000/api/singleConveyance/${id}`, {
            credentials: 'include'
        })

        if (!responce.ok) {
            throw new Error(`HTTP error! status:${responce.status}`);
        }
        const data = await responce.json();
        const editData = data.data[0];
        editData.reject_note = "",
        editData.reject_condition = false;
        setDate(editData.date);


        SetData(editData);

    }

    const handleData = (e) => {
        const totalData = { ...collectData };
        totalData[e.target.name] = e.target.value;
        // totalData.createdBy = loggedInUser.userName;
        SetData(totalData);
    }

    const handleConveyance = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/updateSingleConveyance/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collectData),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                navigat('/rejectBill')
            })
            .catch((error) => {
                console.log(error.message);
            });
        e.target.reset();

    }

    return (
        <>
            <div className='container headerCover mb-5'>
                <form onSubmit={handleConveyance} className="row g-3 pb-4 inputFormCss">
                    <div className="col-md-6 mb-4">
                        <Calendar onChange={setDate} value={dateValue} />
                    </div>
                    <div className="col-md-6 mb-4 selectedDate ">
                        <h6 className="text-success bold shadow px-5 py-2 h5 rounded"> Selected Date : <span className="text-danger bolder ">{moment(dateValue).format("Do MMM YY")}</span></h6>
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="start_Time" className="form-label">Start Time</label>
                        <input onChange={handleData} value={collectData?.start_Time} name="start_Time" type="text" className="form-control" id="start_Time" placeholder='Start Time - 9.30 AM' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="end_time" className="form-label">End Time</label>
                        <input onChange={handleData} value={collectData?.end_time} name="end_time" type="text" className="form-control" id="end_time" placeholder='End TIme-5.00 PM' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="from_location" className="form-label">From Location</label>
                        <input onChange={handleData} value={collectData?.from_location} name="from_location" type="text" className="form-control" id="from_location" placeholder='From Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="to_location" className="form-label">To Location</label>
                        <input onChange={handleData} value={collectData?.to_location} name="to_location" type="text" className="form-control" id="to_location" placeholder='To Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">Ticket Id</label>
                        <input onChange={handleData} value={collectData?.ticket_id} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Ticket Id' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="pop_or_customer_name" className="form-label">POP/Customer Name</label>
                        <input onChange={handleData} value={collectData?.pop_or_customer_name} name="pop_or_customer_name" type="text" className="form-control" id="pop_or_customer_name" placeholder='POP/Customer Name' required />
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="transport" className="form-label">Transport</label>
                        <select id="transport" name="transport" className="form-select" onChange={handleData} required>
                            <option className="bg-info" value={collectData?.transport}>{collectData?.transport}</option>
                            <option value="">Choose...</option>
                            <option value="Bus" >Bus</option>
                            <option value="CNG" >CNG</option>
                            <option value="Chittagong" >Rikshaw</option>
                            <option value="Barishal" >Bike</option>
                            <option value="Rajshahi" >Auto Rikshaw</option>
                            <option value="Uber" >Uber</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="conveyance_amount" className="form-label">Conveyance Amount</label>
                        <input onChange={handleData} value={collectData?.conveyance_amount} name="conveyance_amount" type="text" className="form-control" id="conveyance_amount" placeholder='Conveyance Amount' />
                    </div>


                    {/* Customer section -------------------------------- */}

                    <div className="row fromMiddleSeparetion mt-3 ">
                        <div className="fromMidleSeparetionHeder">
                            <h5>Holiday Section</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_hour" className="form-label">Hour</label>
                            <input onChange={handleData} value={collectData?.holiday_hour} name="holiday_hour" type="text" className="form-control" id="holiday_hour" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_amount" className="form-label">Amount</label>
                            <input onChange={handleData} value={collectData?.holiday_amount} name="holiday_amount" type="number" className="form-control" id="holiday_amount" placeholder='Holiday Amount' />
                        </div>
                    </div>

                    <div className="row fromMiddleSeparetion">
                        <div className="fromMidleSeparetionHeder">
                            <h5>OverTime Section</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_from" className="form-label">From</label>
                            <input onChange={handleData} value={collectData?.overtime_from} name="overtime_from" type="text" className="form-control" id="overtime_from" placeholder='From Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_to" className="form-label">To</label>
                            <input onChange={handleData} value={collectData.overtime_to} name="overtime_to" type="text" className="form-control" id="overtime_to" placeholder='To Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_hour" className="form-label">Hour</label>
                            <input onChange={handleData} value={collectData.overtime_hour} name="overtime_hour" type="text" className="form-control" id="overtime_hour" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_amount" className="form-label">Amount</label>
                            <input onChange={handleData} value={collectData.overtime_amount} name="overtime_amount" type="text" className="form-control" id="overtime_amount" placeholder='Amount' />
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-12">
                        <label for="Dinner_amount" className="form-label">Dinner Amaout</label>
                        <input onChange={handleData} value={collectData?.Dinner_amount} name="Dinner_amount" type="text" className="form-control" id="Dinner_amount" placeholder='Dinner Amaout' />
                    </div>

                    <div className="col-md-5 col-sm-12">
                        <label for="remarks" className="form-label">Remarks</label>
                        <textarea onChange={handleData} value={collectData.remarks} name="remarks" type="text" className="form-control" id="remarks" placeholder='Remarks . .  .   .    . ' />
                    </div>


                    <div className="col-md-12 col-sm-12 mb-3 mt-5">
                        <div className="submitButton">
                            <button type="submit" >Update Bill</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}