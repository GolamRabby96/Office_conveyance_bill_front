import React from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";


export const HolidayBill = () => {
    return (
        <>
            <div className='container-fluid headerCover'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bill-history-bar">
                            <h5>Holiday,Ot/Night-Allowance Bill OF April 2025</h5>
                            <div className='billing-month-select'>
                                <select name="cars" id="cars">
                                    <option value="">Chosse Month</option>
                                    <option value="saab">January_25</option>
                                    <option value="mercedes">February_25</option>
                                    <option value="audi">March_25</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-5">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Ticket Id</th>
                                    <th scope="col">Description of Works</th>
                                    <th scope="col" colspan="4">Holiday</th>
                                    <th scope="col" colspan="4">Overtime</th>
                                    <th scope="col">Dinner Bill</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th scope="col">-</th>
                                    <th scope="col">-</th>
                                    <th scope="col">-</th>
                                    <th scope="col" >From</th>
                                    <th scope="col" >To</th>
                                    <th scope="col" >Hour</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Hour</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">-</th>
                                    <th scope="col">-</th>
                                    <th scope="col">-</th>
                                    <th scope="col">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">15/04/2025</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>4</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td className='editButton'><FaEdit /></td>
                                </tr>
                                <tr>
                                    <td scope="row">15/04/2025</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>4</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td className='editButton'><FaEdit /></td>
                                </tr>
                                <tr>
                                    <td scope="row">15/04/2025</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>4</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td className='editButton'><FaEdit /></td>
                                </tr>
                                <tr>
                                    <td scope="row">15/04/2025</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>4</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td className='editButton'><FaEdit /></td>
                                </tr>
                                <tr>
                                    <td scope="row">15/04/2025</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>4</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td>300</td>
                                    <td>-</td>
                                    <td className='editButton'><FaEdit /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* ------------------------------------------- */}
                    <div className="add-button-bottom" >
                        <BsPlusCircleDotted />
                    </div>
                </div>
            </div >
        </>
    )
}
