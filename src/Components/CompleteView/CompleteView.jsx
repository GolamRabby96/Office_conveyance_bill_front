import React, { use, useEffect, useState } from 'react'
import { MainViewComponent } from './MainViewComponent'
import secureLocalStorage from 'react-secure-storage';
import { TbArrowBarToRight } from "react-icons/tb";
import { TbArrowBarToLeft } from "react-icons/tb";

export const CompleteView = () => {
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, SetConveyanceBill] = useState([]);
    const [formData, SetFormData] = useState({});
    const [navCondition, setNavCondition] = useState(true);
    const [groupPropValue, setGroupValue] = useState({});
    const [reLoadComponent, setReloadComponent] = useState(false);
    const [transferData, setTransferData] = useState({});

    useEffect(() => {
        GetConveyanceData();
    }, [reLoadComponent])

    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }

    const GetConveyanceData = async (e) => {
        if (formData.month && formData.year) {
            fetch(`http://localhost:5000/api/groupConCollection`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => {
                    SetConveyanceBill(data.data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }else{
            console.log('input field is empty');
        }
    }

    const handleConveyanceData = async (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/groupConCollection`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                SetConveyanceBill(data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleCurrentActiveData = (id)=>{
        const sumData = {...formData, id:id}
        setTransferData(sumData)
    }


    return (
        <>
            <div className={`complete-container-${navCondition}`}>
                <div className="side-view-component mt-5">
                    <div onClick={() => setNavCondition(!navCondition)} className='complete-nav-arrow'>
                        {navCondition ? <TbArrowBarToLeft /> : <TbArrowBarToRight />}
                    </div>
                    <div className="mt-3">
                        <form onSubmit={handleConveyanceData} className="complete-top-form shadow rounded py-3 px-3">
                            {/* <h5>Conveyance Bill</h5> */}
                            <div className='complete-filter-select'>
                                <select onChange={handleFormData} name="month" id="month" className='rounded'>
                                    <option value="">Month</option>
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
                                    <option value="">Year</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                            <div className='goButton'>
                                <button type='submit' className='buttonCss'>Go</button>
                            </div>

                        </form>
                    </div>
                    <hr />
                    <hr />
                    <div className='complete-user-block'>
                        {
                            conveyanceData?.map(con => (
                                <div key={con._id} onClick={() => { setGroupValue(con.allData) , handleCurrentActiveData(con._id)}} className='complete-user-list'>
                                    <h6>{con.preparer_by[0]}</h6>
                                    <p>{con.preparer_Zone[0]}</p>
                                    <span>{con.count}</span>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            <div onDoubleClick={() => setNavCondition(!navCondition)} className='px-1'>
                <MainViewComponent transferData={transferData} reLoadComponent={reLoadComponent} setReloadComponent={setReloadComponent} />
            </div>

        </>
    )
}