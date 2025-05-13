import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { UserContext } from '../../App';
import { GiClockwork } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { PiMapPinSimpleAreaLight } from "react-icons/pi";
import { FaPeoplePulling } from "react-icons/fa6";
import { TbGitBranchDeleted } from "react-icons/tb";


export const SideNavBar = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [menubarVisible, setMenubarCondition] = useState(true);

    const getUser = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, setConveyanceData] = useState([]);
    const [approvedId, setApprovedId] = useState([]);

    console.log(approvedId);

    useEffect(() => {
        // handlePendingData()
    }, [])

    const handlePendingData = async () => {
        // const responce = await fetch(`http://localhost:5000/api/pendingList/${getUser.user_id}`, {
        //     credentials: 'include'
        // });
        // if (!responce.ok) {
        //     throw new Error(`HTTP error! status:${responce.status}`);
        // }
        // const data = await responce.json();
        // setConveyanceData(data?.data.length);
        // console.log(data?.data);
        // console.log(data?.data.length);
    }

    const handleLogOut = () => {
        console.log("Called");
        secureLocalStorage.setItem("userInfo", JSON.stringify({
            isLoggedIn: false,
        }));
        setLoggedInUser({
            isLoggedIn: false
        })
    }


    return (
        <>
            <aside id={`sidebar${menubarVisible}`}>
                <nav className="navbar bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">ADN HCB</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{loggedInUser.user_name}-{loggedInUser.user_id}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/details-view">Complete View</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/pendingList">Pending List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/conveyance"><GiClockwork /> Conveyance/Holiday Bill</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/holiday"><FaOpencart /> Others Bill</Link>
                                    </li>
                                    <hr />
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Add Bill
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/add-conveyance">Add Conveyance Bill</Link></li>
                                            <li><Link className="dropdown-item" to="/add-holiday">Add Others Bill</Link></li>
                                        </ul>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/addMember"><FaPeoplePulling /> Add Member</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/addZone"><PiMapPinSimpleAreaLight /> Add Zone</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/teamMember"><IoIosPeople /> Team Member</Link>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/rejectBill"><TbGitBranchDeleted /> Reject List</Link>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <p className="nav-link text-danger" onClick={handleLogOut}>_Log Out</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside >
        </>
    )

}