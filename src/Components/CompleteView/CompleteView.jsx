import React, { useState } from 'react'
import { MainViewComponent } from './MainViewComponent'
import secureLocalStorage from 'react-secure-storage';
import { TbArrowBarToRight } from "react-icons/tb";
import { TbArrowBarToLeft } from "react-icons/tb";

export const CompleteView = () => {
    const userData = JSON.parse(secureLocalStorage.getItem('userInfo') || '[]');
    const [conveyanceData, SetConveyanceBill] = useState([]);
    const [formData, SetFormData] = useState({});
    const [navCondition, setNavCondition] =  useState(true);

    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }

    const handleConveyanceData = async (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/getConveyance/${userData.user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                SetConveyanceBill(data.data)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }


    return (
        <>
            <div className={`complete-container-${navCondition}`}>
                <div className="side-view-component mt-5">
                    <div onClick={()=>setNavCondition(!navCondition)} className='complete-nav-arrow'>
                        {navCondition ? <TbArrowBarToLeft/>:<TbArrowBarToRight />}
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
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>

                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>

                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>



                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>

                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>
                        <div className='bg-info p-2 my-2 rounded shadow'>
                            <h6>rabby hasan</h6>
                            <p>Chuadanga</p>
                        </div>

                    </div>

                </div>
            </div>
            <div className="">
                <MainViewComponent />
            </div>

        </>
    )
}