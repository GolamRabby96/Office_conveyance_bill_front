import moment from "moment";
import React, { useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect } from "react";




const AddConveyance = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || "[]");


    const [dateValue, setDate] = useState(new Date());
    const [conStart, setConStart] = useState(dayjs('2022-04-17T03:00'));
    const [conEnd, setConEnd] = useState(dayjs('2022-04-17T03:00'));
    const [showPopup, setShowPopup] = useState(false);
    const [blockRapidCall, setRapidCall] = useState(true);
    const [isHoliday, setHoliday] = useState(false);
    const firstRender = useRef(true);
    const [totalMinutesCount, setTotalMinutes] = useState(0);

    const [collectData, SetData] = useState({
        date: "", month: "", year: "", start_time: "", end_time: "",
        from_location: "", to_location: "", ticket_id: "", pop_or_customer_name: "", transport: "",
        conveyance_amount: 0, remarks: "", preparer_by: "", preparer_id: "", preparer_Zone: "", holiday_hour: "",
        holiday_amount: 0, overtime_from: "", overtime_to: "", overtime_hour: "", overtime_amount: 0,
        Dinner_amount: 0, reject_note: "", reject_condition: false, amount_limit: 0
    });


    useEffect(() => {
        if (blockRapidCall == false) {
            handleRemoveHolidaData();
            setRapidCall(!blockRapidCall);

        }
    }, [dateValue])

    useEffect(() => {
        compareReturnTime(collectData);

    }, [conStart, conEnd])


    const handleData = (e) => {
        const totalData = { ...collectData };
        totalData[e.target.name] = e.target.value;
        SetData(totalData);
    }

    const handleHolidayBillPopUp = () => {
        if (blockRapidCall) {
            setShowPopup(true);
            setRapidCall(false);
        }
    }

    const handleHolidayBlock = () => {
        const totalData = { ...collectData };
        console.log('called holiday block');

        setHoliday(true);
        const [h1, m1] = conStart.format('HH:mm').split(":").map(Number);
        const [h2, m2] = conEnd.format('HH:mm').split(":").map(Number);

        const minutes1 = h1 * 60 + m1;
        const minutes2 = h2 * 60 + m2;
        const hours = Math.floor((minutes2 - minutes1) / 60);
        const minutes = (minutes2 - minutes1) % 60;

        const amountCal = ((hours * 60) + minutes) / 60;

        totalData.holiday_hour = `${hours}:${minutes}`;

        if (hours >= 4) {
            totalData.holiday_amount = userData.amount_limit == 3000 ? 400 : 260;
        } else {
            totalData.overtime_amount = amountCal * (userData.amount_limit == 3000 ? 90 : 60);
        }
        console.log('called holiday block', totalData.holiday_amount);
        SetData(totalData);
    }



    const compare24HourTimes = (t1, t2) => {
        console.log(t1, t2);
        const [h1, m1] = t1.split(":").map(Number);
        const [h2, m2] = t2.split(":").map(Number);
        const minutes1 = h1 * 60 + m1;
        const minutes2 = h2 * 60 + m2;
        console.log(minutes1, minutes2, minutes1 > minutes2);
        return minutes1 > minutes2;
    }

    const overtimeCount = (A, B) => {
        const [h1, m1] = A.split(":").map(Number);
        const [h2, m2] = B.split(":").map(Number);
        const minutes1 = h1 * 60 + m1;
        const minutes2 = h2 * 60 + m2;
        const totalMinutes = minutes2 - minutes1;
        setTotalMinutes(totalMinutes);
        console.log('-__totalminutes', minutes2, minutes1, totalMinutes);

        return {
            checkcondition: totalMinutes > 510,
            totalMinutes: totalMinutes
        }

    }

    const compareReturnTime = (addedData) => {
        const getResult = overtimeCount(conStart.format('HH:mm'), conEnd.format('HH:mm'));

        if (getResult.totalMinutes > 629) {
            if (getResult.checkcondition) {
                addedData.start_time = conStart.format('hh:mm A');
                addedData.end_time = conEnd.format('hh:mm A');
                const hours = Math.floor((getResult.totalMinutes - 510) / 60);
                const minutes = (getResult.totalMinutes - 510) % 60;
                const amountCal = ((hours * 60) + minutes) / 60;

                addedData.overtime_hour = `${hours}:${minutes}`;
                addedData.overtime_amount = amountCal * (userData.amount_limit == 3000 ? 90 : 60);
                SetData(addedData);
            } else {
                addedData.start_time = conStart.format('hh:mm A');
                addedData.end_time = conEnd.format('hh:mm A');
                addedData.overtime_hour = "";
                addedData.overtime_amount = "";
                SetData(addedData);
            }
        } else {
            addedData.start_time = conStart.format('hh:mm A');
            addedData.end_time = conEnd.format('hh:mm A');
            addedData.overtime_hour = "";
            addedData.overtime_amount = "";
            SetData(addedData);
        }

        if (compare24HourTimes(conEnd.format('HH:mm'), '21:59')) {
            addedData.Dinner_amount = userData.amount_limit == 3000 ? 0 : 200;
        } else {
            addedData.Dinner_amount = "";
        }
        SetData(addedData);

        if (isHoliday) {
            handleHolidayBlock();
        }
    }
    const handleRemoveHolidaData = () => {
        const totalData = { ...collectData };

        totalData.holiday_hour = "";
        totalData.holiday_amount = "";
        setHoliday(false);
        SetData(totalData);
    }

//  preparer_Zone: userData.sub_zone,
//                 next_responsible_person: userData.next_responsible_person,
//                 next_responsible_person_id: userData.next_responsible_person_id,
//                 amount_limit: userData.amount_limit

    const handleConveyance = (e) => {
        e.preventDefault();

        if (conEnd.format('HH:mm') == '03:00' || conStart.format('HH:mm') == '03:00') {
            if (conStart.format('HH:mm') == '03:00') {
                alert("Start time is missing")
            } else {
                alert("End time is missing")
            }

        } else {
            let date = moment(dateValue).format('L');
            let month = moment(dateValue).format('MMMM');
            let year = moment(dateValue).year();
            const totalData = {
                ...collectData, date: date, month: month, year: year, preparer_by: userData.user_name,
                preparer_id: userData.user_id, preparer_info:userData.user_objectID

            };

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

    }


    return (
        <>
            <div className='container headerCover mb-5'>
                <form onSubmit={handleConveyance} className="row g-3 pb-4 inputFormCss">
                    <div className="col-md-6 mb-4">
                        <Calendar onChange={setDate} value={dateValue} />
                    </div>
                    <div className="col-md-6 mb-4 selectedDate">
                        <h6 className="text-success bold shadow px-5 py-2 h5 rounded"> Selected date :
                            <span className="text-danger bolder">{moment(dateValue).format('L')}</span>
                            {blockRapidCall ? <div className="silimaButton p-2">
                                <button type="button" onClick={() => handleHolidayBillPopUp()} className="py-2 text-bold">Apply For Holiday</button>
                            </div> : ""}
                        </h6>
                    </div>

                    <div className="col-md-2 col-sm-12 mt-5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div>
                                <label style={{ display: 'block', paddingBottom: 5 }}>
                                    Start Time
                                </label>
                                <TimePicker
                                    value={conStart}
                                    onChange={setConStart}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>

                    <div className="col-md-2 col-sm-12 mt-5">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div>
                                <label style={{ display: 'block', paddingBottom: 5 }}>
                                    End Time
                                </label>
                                <TimePicker
                                    value={conEnd}
                                    onChange={setConEnd}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <hr />

                    <div className="col-md-3 col-sm-12 mt-2">
                        <label for="from_location" className="form-label">From Location</label>
                        <input onBlur={handleData} name="from_location" type="text" className="form-control" id="from_location" placeholder='From Location' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-2">
                        <label for="to_location" className="form-label">To Location</label>
                        <input onBlur={handleData} name="to_location" type="text" className="form-control" id="to_location" placeholder='To Location' required />
                    </div>

                    <div className="col-md-2 col-sm-12 mt-2">
                        <label for="ticket_id" className="form-label">Ticket Id</label>
                        <input onBlur={handleData} name="ticket_id" type="text" className="form-control" id="ticket_id" placeholder='Ticket Id' required />
                    </div>

                    <div className="col-md-3 col-sm-12 mt-2">
                        <label for="pop_or_customer_name" className="form-label">Distination</label>
                        <input onBlur={handleData} name="pop_or_customer_name" type="text" className="form-control" id="pop_or_customer_name" placeholder='Purposes' required />
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="transport" className="form-label">Transport</label>
                        <input onBlur={handleData} name="transport" type="text" className="form-control" id="transport" placeholder='Bus/CNG/Rickshaw/Office Vehicle' />
                    </div>
                    <div className="col-md-3 col-sm-12 mt-5">
                        <label for="conveyance_amount" className="form-label">Conveyance Amount</label>
                        <input onBlur={handleData} name="conveyance_amount" type="text" className="form-control" id="conveyance_amount" placeholder='Conveyance Amount' />
                    </div>


                    {/* Customer section -------------------------------- */}

                    {isHoliday ? <div className="row fromMiddleSeparetion mt-3 ">
                        <div className="fromMidleSeparetionHeder">
                            <h6>Holiday Section</h6>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_hour" className="form-label">Hour</label>
                            <input value={collectData.holiday_hour} onBlur={handleData} name="holiday_hour" type="text" className="form-control" id="holiday_hour" placeholder='Total Hour' disabled />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label for="holiday_amount" className="form-label">Amount</label>
                            <input value={collectData.holiday_amount} onBlur={handleData} name="holiday_amount" type="number" className="form-control" id="holiday_amount" placeholder='Holiday Amount' disabled />
                        </div>
                    </div> : ""}

                    {collectData.overtime_amount ?
                        <div className="row fromMiddleSeparetion">
                            <div className="fromMidleSeparetionHeder">
                                <h6>OverTime Section</h6>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label for="overtime_hour" className="form-label">Hour</label>
                                <input value={collectData.overtime_hour} name="overtime_hour" type="text" className="form-control" id="overtime_hour" placeholder='Total Hour' disabled />
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label for="overtime_amount" className="form-label">Amount</label>
                                <input value={collectData.overtime_amount} name="overtime_amount" type="text" className="form-control" id="overtime_amount" placeholder='Amount' disabled />
                            </div>
                        </div> : ""
                    }



                    {collectData.Dinner_amount ?
                        <div className="col-md-2 col-sm-12">
                            <label for="Dinner_amount" className="form-label">Dinner Amount</label>
                            <input onBlur={handleData} value={collectData.Dinner_amount} name="Dinner_amount" type="text" className="form-control" id="Dinner_amount" placeholder='Dinner Amaout' disabled />
                        </div> : ""
                    }

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

                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-box">
                            <div className="col-md-12 mb-4 ">
                                <h6 className="text-success bold shadow px-5 py-2 h5 rounded text-center"> <span className="text-info bolder">{moment(dateValue).format('L')} is holiday ?</span></h6>
                            </div>

                            <div className="twoButtonBetween">
                                <div>
                                    <div className="silimaButton">
                                        <button type="submit" onClick={() => { setShowPopup(false), handleRemoveHolidaData() }}>No</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="silimaButton">
                                        <button type="submit" onClick={() => { setShowPopup(false), handleHolidayBlock() }}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


export default AddConveyance;