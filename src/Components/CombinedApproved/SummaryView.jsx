import React, { useState } from 'react'
import { BsPlusCircleDotted } from "react-icons/bs";
import secureLocalStorage from 'react-secure-storage';


const SummaryView = () => {
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

        fetch(`http://localhost:5000/api/summaryView`, {
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
                    <div className="col-md-12 no-print">
                        <form onSubmit={handleConveyanceData} className="bill-history-bar shadow rounded">
                            <h5 className='mx-3 '>Chosee Month and Year</h5>
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

                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="18" className='p-3 text-center'>
                                        <p>ADN TELECOM LIMITED</p>
                                        <p>OT, HOLIDAY, TA, DA & Other Bill for Technology and Engineering Depertment</p>
                                        <br />
                                        <p>For the month of February 2025</p>
                                    </th>
                                </tr>
                            </thead>
                            <thead>
                                <tr className="text-center">
                                    <th scope="col" className="text-center">SL</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Month</th>
                                    <th scope="col">Holiday</th>
                                    <th scope="col">Over Time</th>
                                    <th scope="col" className="text-center ">Total</th>
                                    <th scope="col" className="text-center">Max Limit</th>
                                    <th scope="col" className="text-center ">Payable</th>
                                    <th scope="col">Unpaid</th>
                                    <th scope="col" >Dinner Bill</th>
                                    <th scope="col" className="text-center ">Conveyance</th>
                                    <th scope="col" className="">Total Payable</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    conveyanceData?.map((con, i) => (
                                        <tr className='text-center' key={`modal-${con._id}`}>
                                            <td className="text-center">{i + 1}</td>
                                            <td >{con._id}</td>
                                            <td >{con.name[0]}</td>
                                            <td>Engineer</td>
                                            <td>Department</td>
                                            <td>{con.month}</td>

                                            <td>{con.holiday}</td>
                                            <td>{con.overtime}</td>
                                            <td>{con.holiday + con.overtime }</td>
                                            <td>{con.limit[0]}</td>
                                            <td>{con.holiday + con.overtime > 3000 ? 3000 : con.holiday + con.overtime}</td>
                                            <td>{con.holiday + con.overtime > 3000 ? con.holiday + con.overtime - con.limit[0]  : 0}</td>

                                            <td>{con.DinnerBill}</td>
                                            <td>{con.conveyance}</td>
                                            <td>{con.holiday + con.overtime > 3000 ? con.limit[0] + con.DinnerBill + con.conveyance : con.holiday + con.overtime  + con.DinnerBill + con.conveyance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryView;

