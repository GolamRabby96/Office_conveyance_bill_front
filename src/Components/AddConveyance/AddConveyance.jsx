import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const AddConveyance = () => {
    const [value, setDate] = useState(new Date());
    const [collectData, SetData] = useState({});




    const handleData = (e) => {
        const totalData = { ...collectData };
        totalData[e.target.name] = e.target.value;
        // totalData.createdBy = loggedInUser.userName;
        SetData(totalData);
    }


    return (
        <>
            <div className='container headerCover mb-5'>
                <form className="row g-3 pb-4 inputFormCss">
                <div className="col-md-6 mb-4">
                        <Calendar onChange={setDate} value={value} />
                    </div>
                    <div className="col-md-6 mb-4 selectedDate">
                        <h6> Select date : 06/04/2025</h6>
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="service_oid" className="form-label">Start Time</label>
                        <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Start Time - 9.30 AM' />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">End Time</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='End TIme-5.00 PM' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">From Location</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='From Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">To Location</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='To Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">Ticket Id</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Ticket Id' required />
                    </div>

                    <div className="col-md-4 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">POP/Customer Name</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='POP/Customer Name' required />
                    </div>

                    <div className="col-md-5 col-sm-12 mt-5">
                        <label for="ticket_id" className="form-label">Remarks</label>
                        <textarea onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Remarks' required />
                    </div>
                    {/* Customer section -------------------------------- */}


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