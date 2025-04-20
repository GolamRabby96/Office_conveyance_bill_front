import React from 'react'
import { BsPlusCircleDotted } from "react-icons/bs";

export const ConveyanceBill = () => {
    return (
        <>
            <div className='container-fluid headerCover'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bill-history-bar">
                            <h5>Conveyance Bill OF April 2025</h5>
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
                                    <th scope="col">Start Time</th>
                                    <th scope="col">End TIme</th>
                                    <th scope="col">From Location</th>
                                    <th scope="col">To Location</th>
                                    <th scope="col">Ticket Id</th>
                                    <th scope="col">POP/Customer Name</th>
                                    <th scope="col">Transport</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">E/Ok</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">15/04/2025</th>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>Motijheel</td>
                                    <td>Badda</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>Rickshaw</td>
                                    <td>240</td>
                                    <td>-</td>
                                    <td>Edit/OK</td>
                                </tr>
                                <tr>
                                    <th scope="row">15/04/2025</th>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>Motijheel</td>
                                    <td>Badda</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>Rickshaw</td>
                                    <td>240</td>
                                    <td>-</td>
                                    <td>Edit/OK</td>
                                </tr>
                                <tr>
                                    <th scope="row">15/04/2025</th>
                                    <td>04.20 PM</td>
                                    <td>05.20PM</td>
                                    <td>Motijheel</td>
                                    <td>Badda</td>
                                    <td>#012548</td>
                                    <td>Janata Bank Badda</td>
                                    <td>Rickshaw</td>
                                    <td>240</td>
                                    <td>-</td>
                                    <td>Edit/OK</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* ------------------------------------------- */}
                    <div className="add-button-bottom" >
                        <BsPlusCircleDotted />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConveyanceBill
