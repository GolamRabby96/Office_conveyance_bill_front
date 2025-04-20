import { useEffect, useState, createContext, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { SideNavBar } from './Components/SideNavBar/SideNavBar';
import { LandingPage } from './Components/LandingPage/LandingPage';
import { HolidayBill } from './Components/HolidayBill/HolidayBill';
import { AddConveyance } from './Components/AddConveyance/AddConveyance';
import { AddHoliday } from './Components/AddHoliday/AddHoliday';
import ConveyanceBill from './Components/ConveyanceBill/ConveyanceBill';


function App() {

  useEffect(() => {

  }, []);



  return (
    <div className='wrapper'>
      <Router>
        <SideNavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/conveyance" element={<ConveyanceBill />} />
          <Route exact path="/holiday" element={<HolidayBill />} />
          <Route exact path="/add-conveyance" element={<AddConveyance />} />
          <Route exact path="/add-holiday" element={<AddHoliday />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
