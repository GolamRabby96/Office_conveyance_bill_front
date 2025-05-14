import React from 'react'

export const CompleteConveyance = () => {

    return (
        <>
            <div className="container">
                <div className="row">
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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-center">
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
                                <th scope="col" className="text-center">
                                    <div>
                                        <span role="button" onClick={() => handleAllSelectData(!isChecked)}>All</span>
                                    </div>
                                </th>

                            </tr>
                        </thead>
                        </table>
                </div>
            </div>
        </>
    )
}