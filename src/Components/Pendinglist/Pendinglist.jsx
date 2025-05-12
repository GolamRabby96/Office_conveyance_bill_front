import React, { useState } from "react";
import { SiAnsys } from "react-icons/si";
import { PendingConveyance } from "./pendingConveyance";
import { PendingHoliday } from "./pendingHoliday";
import { PendingDaBill } from "./pendingDaBill";
import { PendingTaBill } from "./pendingTaBill";

export const Pendinglist = () => {
    const [conveyanceVisible, setConveyance] = useState(true);
    const [holidayVisible, setHoliday] = useState(false);
    const [TaBill, setTa] = useState(false);
    const [DaBill, setDa] = useState(false);

    const handleCondition = (condition) => {
        if (condition == 'Conveyance') {
            setConveyance(true); setHoliday(false); setTa(false); setDa(false);
        }
        if (condition == 'Holiday') {
            setConveyance(false); setHoliday(true); setTa(false); setDa(false);
        }
        if (condition == 'TABILL') {
            setConveyance(false); setHoliday(false); setTa(true); setDa(false);
        }
        if (condition == 'DABILL') {
            setConveyance(false); setHoliday(false); setTa(false); setDa(true);
        }
    }

    return (
        <>
            <div className="container-fluid headerCover">
                <div className="row topRowDiv shadow">
                    <div className="col ">
                        <button onClick={() => handleCondition('Conveyance')} >Conveyance & Holiday</button>
                    </div>

                    <div className="col">
                        <button onClick={() => handleCondition('TABILL')}>TA Bill</button>
                    </div>
                    <div className="col">
                        <button onClick={() => handleCondition('DABILL')}>DA Bill</button>
                    </div>
                    <div className="col">
                        <button onClick={() => handleCondition('Holiday')}>Others Bills</button>
                    </div>
                </div>
                <>
                    {conveyanceVisible && <PendingConveyance />}
                    {holidayVisible && <PendingHoliday />}
                    {TaBill && <PendingTaBill />}
                    {DaBill && <PendingDaBill />}

                </>
            </div>
        </>
    )
}