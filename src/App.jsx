import { useEffect, useState, createContext, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

import './App.css'
import { SideNavBar } from './Components/SideNavBar/SideNavBar';
import { LandingPage } from './Components/LandingPage/LandingPage';
import { HolidayBill } from './Components/HolidayBill/HolidayBill';
import { AddConveyance } from './Components/AddConveyance/AddConveyance';
import { AddHoliday } from './Components/AddHoliday/AddHoliday';
import ConveyanceBill from './Components/ConveyanceBill/ConveyanceBill';
import AddZone from './Components/AddZone/AddZone';
import { AddMember } from './Components/AddMember/AddMember';
import TeamMember from './Components/TeamMember/TeamMember';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import { Pendinglist } from './Components/Pendinglist/Pendinglist';
import { RejectBill } from './Components/RejectBill/RejectBill';
import { CommonReject } from './Components/RejectBill/CommonReject';
import { EditConveyanceBill } from './Components/RejectBill/EditConvenyanceBill';

export const UserContext = createContext();

function App() {
  const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || "[]");
  const [checkUser, SetUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false, user_name: '', user_id: '', sub_zone: '', next_responsible_person: '', user_designation: '', user_access_level: '', next_responsible_person_id: ''
  })

  useEffect(() => {
    if (userData.isLoggedIn === true) {
      setLoggedInUser({
        isLoggedIn: true, user_name: userData.user_name, user_id: userData.user_id, sub_zone: userData.sub_zone, next_responsible_person_id: userData.next_responsible_person_id,
        next_responsible_person: userData.next_responsible_person, user_designation: userData.user_designation, user_access_level: userData.user_access_level
      })
      SetUser(true);
    }
  }, [checkUser, loggedInUser.isLoggedIn]);



  return (
    <div className='wrapper'>
      <UserContext.Provider
        value={{ loggedInUser, setLoggedInUser }}
      >
        <Router>
          {loggedInUser.isLoggedIn && <SideNavBar />}
          <Routes>

            {/* ------------------------------------------------------------------------------------------------- */}
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/conveyance" element={<ConveyanceBill />} />
              <Route exact path="/holiday" element={<HolidayBill />} />
              <Route exact path="/add-conveyance" element={<AddConveyance />} />
              <Route exact path="/add-holiday" element={<AddHoliday />} />
              <Route exact path="/addZone" element={<AddZone />} />
              <Route exact path="/addMember" element={<AddMember />} />
              <Route exact path="/teamMember" element={<TeamMember />} />
              <Route exact path="/pendingList" element={<Pendinglist />} />
              <Route exact path="/rejectBill" element={<CommonReject />} />
              <Route exact path="/editConveyance/:id" element={<EditConveyanceBill />} />
            </Route>
            {/* ------------------------------------------------------------------------------------------------- */}

            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<div className='page404'></div>} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App

