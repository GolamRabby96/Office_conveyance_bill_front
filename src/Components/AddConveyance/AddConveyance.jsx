import moment from "moment";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";


export const AddConveyance = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || "[]");
    const [dateValue, setDate] = useState(new Date());
    const [collectData, SetData] = useState({});

    const handleData = (e) => {
        const totalData = { ...collectData };
        totalData[e.target.name] = e.target.value;
        SetData(totalData);
    }

    const handleConveyance = (e) => {
        e.preventDefault();

        let date = moment(dateValue).format('L');
        let month = moment(dateValue).format('MMMM');
        let year = moment(dateValue).year();
        const totalData = {
            ...collectData, date: date, month: month, year: year, preparer_by: userData.user_name, preparer_id: userData.user_id, preparer_Zone: userData.sub_zone, next_responsible_person: userData.next_responsible_person,
            next_responsible_person_id: userData.next_responsible_person_id
        };
        console.log(totalData);

        fetch('http://localhost:5000/api/addConveyance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(totalData),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                SetData({});
                alert(data.message)
                navigate('/conveyance')
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
                        <h6 className="text-success bold shadow px-5 py-2 h5 rounded"> Selected date : <span className="text-danger bolder">{moment(dateValue).format('L')}</span></h6>
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="start_Time" className="form-label">Start Time</label>
                        <input onBlur={handleData} name="start_Time" type="text" className="form-control" id="start_Time" placeholder='Start Time - 9.30 AM' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="end_time" className="form-label">End Time</label>
                        <input onBlur={handleData} name="end_time" type="text" className="form-control" id="end_time" placeholder='End TIme-5.00 PM' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="from_location" className="form-label">From Location</label>
                        <input onBlur={handleData} name="from_location" type="text" className="form-control" id="from_location" placeholder='From Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="to_location" className="form-label">To Location</label>
                        <input onBlur={handleData} name="to_location" type="text" className="form-control" id="to_location" placeholder='To Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">Ticket Id</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Ticket Id' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="pop_or_customer_name" className="form-label">POP/Customer Name</label>
                        <input onBlur={handleData} name="pop_or_customer_name" type="text" className="form-control" id="pop_or_customer_name" placeholder='POP/Customer Name' required />
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="transport" className="form-label">Transport</label>
                        <input onBlur={handleData} name="transport" type="text" className="form-control" id="transport" placeholder='Bus/CNG/Rickshaw/Office Vehicle' />
                        {/* <select id="transport" name="transport" className="form-select" onBlur={handleData} required>
                            <option value="">Choose...</option>
                            <option value="Bus" >Bus</option>
                            <option value="CNG" >CNG</option>
                            <option value="Chittagong" >Rikshaw</option>
                            <option value="Barishal" >Bike</option>
                            <option value="Rajshahi" >Auto Rikshaw</option>
                            <option value="Uber" >Uber</option>
                            <option value="Office Vehicle" >Office Vehicle</option>
                        </select> */}
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="conveyance_amount" className="form-label">Conveyance Amount</label>
                        <input onBlur={handleData} name="conveyance_amount" type="text" className="form-control" id="conveyance_amount" placeholder='Conveyance Amount' />
                    </div>


                    {/* Customer section -------------------------------- */}

                    <div className="row fromMiddleSeparetion mt-3 ">
                        <div className="fromMidleSeparetionHeder">
                            <h6>Holiday Section</h6>
                        </div>
                        {/* <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">From</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='From Time' />cp
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">To</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='To Time' />
                        </div> */}
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_hour" className="form-label">Hour</label>
                            <input onBlur={handleData} name="holiday_hour" type="text" className="form-control" id="holiday_hour" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_amount" className="form-label">Amount</label>
                            <input onBlur={handleData} name="holiday_amount" type="number" className="form-control" id="holiday_amount" placeholder='Holiday Amount' />
                        </div>
                    </div>

                    <div className="row fromMiddleSeparetion">
                        <div className="fromMidleSeparetionHeder">
                            <h6>OverTime Section</h6>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_from" className="form-label">From</label>
                            <input onBlur={handleData} name="overtime_from" type="text" className="form-control" id="overtime_from" placeholder='From Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_to" className="form-label">To</label>
                            <input onBlur={handleData} name="overtime_to" type="text" className="form-control" id="overtime_to" placeholder='To Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_hour" className="form-label">Hour</label>
                            <input onBlur={handleData} name="overtime_hour" type="text" className="form-control" id="overtime_hour" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="overtime_amount" className="form-label">Amount</label>
                            <input onBlur={handleData} name="overtime_amount" type="text" className="form-control" id="overtime_amount" placeholder='Amount' />
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-12">
                        <label for="Dinner_amount" className="form-label">Dinner Amount</label>
                        <input onBlur={handleData} name="Dinner_amount" type="text" className="form-control" id="Dinner_amount" placeholder='Dinner Amaout' />
                    </div>

                    <div className="col-md-5 col-sm-12">
                        <label for="remarks" className="form-label">Remarks</label>
                        <textarea onBlur={handleData} name="remarks" type="text" className="form-control" id="remarks" placeholder='Remarks . .  .   .    . ' />
                    </div>


                    <div className="col-md-12 col-sm-12 mb-3 mt-5">
                        <div className="submitButton">
                            <button type="submit" >Add Conveyance</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}