import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GrTicket } from "react-icons/gr";
import { PiTicketDuotone } from "react-icons/pi";
import { DiGoogleAnalytics } from "react-icons/di";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdGroupAdd } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import secureLocalStorage from 'react-secure-storage';
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { CgLayoutGrid } from 'react-icons/cg';

export const SideNavBar = () => {
    const [menubarVisible, setMenubarCondition] = useState(true);

    console.log('please check the condition', menubarVisible)

    // <GoSidebarExpand />

    return (
        <>
            <aside id={`sidebar${menubarVisible}`}>
                <nav class="navbar bg-body-tertiary fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">ADN HCB</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Rabby Hasan-1010822</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/conveyance">Conveyance Bill</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/holiday">HoliDay/OverTime</Link>
                                    </li>
                                    <hr/>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Add Bill
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><Link class="dropdown-item" to="/add-conveyance">Add Conveyance Bill</Link></li>
                                            <li><Link class="dropdown-item" to="/add-holiday">Add Holiday Bill</Link></li>
                                        </ul>
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