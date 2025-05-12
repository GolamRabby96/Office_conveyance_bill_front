import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const AddHoliday = () => {
    const [value, setDate] = useState(new Date());
    const [collectData, SetData] = useState({});




    const handleData = (e) => {
        const totalData = { ...collectData };
        totalData[e.target.name] = e.target.value;
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
                    <div className="col-md-3 col-sm-12 mt-3 mb-3">
                        <label for="ticket_id" className="form-label">Ticket Id</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='ticket id' required />
                    </div>
                    <div className="col-md-5 col-sm-12 mt-3 mb-3">
                        <label for="ticket_id" className="form-label">Description</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='ticket id' required />
                    </div>
                    <div className="row fromMiddleSeparetion">
                        <div className="fromMidleSeparetionHeder">
                            <h5>Holiday Section</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">From</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='From Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">To</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='To Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">Hour</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">Amount</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Amount' />
                        </div>
                    </div>
                    <div className="row fromMiddleSeparetion">
                        <div className="fromMidleSeparetionHeder">
                            <h5>OverTime Section</h5>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">From</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='From Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">To</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='To Time' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">Hour</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Total Hour' />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="service_oid" className="form-label">Amount</label>
                            <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Amount' />
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-12">
                        <label for="service_oid" className="form-label">Dinner Amaout</label>
                        <input onBlur={handleData} name="service_oid" type="text" className="form-control" id="inpservice_oidutEmail4" placeholder='Dinner Amaout' />
                    </div>


                    <div className="col-md-4 col-sm-12">
                        <label for="ticket_id" className="form-label">Remarks</label>
                        <textarea onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Remarks . . .' required />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <label for="ticket_id" className="form-label">Total Amaout</label>
                        <textarea onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='0' required />
                    </div>
                    {/* Customer section -------------------------------- */}


                    <div className="col-md-12 col-sm-12 mb-3">
                        <div className="submitButton">
                            <button type="submit" >Add Holiday</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}