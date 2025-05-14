import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { CgLayoutGrid } from 'react-icons/cg';
import manimage from '../../images/not.png'

export const LandingPage = () => {
    const navigat = useNavigate();
    const [topBarData, SetData] = useState([]);
    const [services, getServices] = useState({});
    const [filterData, getFilterData] = useState({});
    const [collectName, getCollectName] = useState("Installation");
    const userdata = JSON.parse(secureLocalStorage.getItem("user") || "[]");

    const [todayData, setTodayData] = useState({});

    useEffect(() => {

    }, [])




    return (
        <>
            <div className='container headerCover'>
                <div className="card mb-3">
                    <div className='container'>
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img src={manimage} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8 mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">Rabby Hasan</h5>
                                    <p className="card-text">Engineer - Dhaka HQ</p>
                                    <p className="card-text"><small className="text-body-secondary">ID: 1010822</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----  Top profile card  */}
            </div>
            {/* ------------------------------------- Top Container */}

            <div className="container">
                <div className="row">
                    <div className="bill-history-bar">
                        <h5>Bill History</h5>
                        <div className='billing-month-select'>
                            <select name="cars" id="cars">
                                <option value="">Chosse</option>
                                <option value="saab">January_25</option>
                                <option value="mercedes">February_25</option>
                                <option value="audi">March_25</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default LandingPage;