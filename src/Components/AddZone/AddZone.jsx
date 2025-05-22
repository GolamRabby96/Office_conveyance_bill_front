import React, { useState } from 'react'
import { useEffect } from 'react';
import { CgLayoutGrid } from 'react-icons/cg';
import { MdDeleteSweep } from "react-icons/md";

const AddZone = () => {
    const [stateUpdated, setState] = useState(false);
    const [dhakaZone, SetdhakaZone] = useState({});
    const [Khulna, SetKhulna] = useState({});
    const [Chittagong, SetChittagong] = useState({});
    const [Barishal, SetBarishal] = useState({});
    const [Rajshahi, SetRajshahi] = useState({});
    const [Rangpur, SetRangpur] = useState({});
    const [Sylhet, SetSylhet] = useState({});
    const [Mymensingh, SetMymensingh] = useState({});

    const [formData, SetFormData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");




    useEffect(() => {
        getZone();
    }, [stateUpdated]);

    const getZone = async (e) => {
        const response = await fetch('http://localhost:5000/api/getZone', {
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const DhakaData = data.data.filter(t => t.zone_name == 'Dhaka');
        const KhulnaData = data.data.filter(t => t.zone_name == 'Khulna');
        const ChittagongData = data.data.filter(t => t.zone_name == 'Chittagong');
        const Barishal = data.data.filter(t => t.zone_name == 'Barishal');
        const Rajshahi = data.data.filter(t => t.zone_name == 'Rajshahi');
        const Rangpur = data.data.filter(t => t.zone_name == 'Rangpur');
        const Sylhet = data.data.filter(t => t.zone_name == 'Sylhet');
        const Mymensingh = data.data.filter(t => t.zone_name == 'Mymensingh');
        SetdhakaZone(DhakaData)
        SetKhulna(KhulnaData)
        SetChittagong(ChittagongData)
        SetBarishal(Barishal);
        SetRajshahi(Rajshahi);
        SetRangpur(Rangpur);
        SetSylhet(Sylhet);
        SetMymensingh(Mymensingh);
    }

    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }


    const handleAddUserSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/addZone', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {

                SetInfoMessage(data.message);
                SetFormData({});
                setState(!stateUpdated);
            })
            .catch((error) => {
                console.log(error.message);
            });
        e.target.reset();
    }


    const handleSubZoneDelete = (id) => {
        fetch(`http://localhost:5000/deleteSubZone/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                setState(!stateUpdated);
            })
    }


    setTimeout(function () {
        SetInfoMessage("");
    }, 6000);

    return (
        <div className='container headerCover'>
            <form onSubmit={handleAddUserSubmit} className="row g-3 divDesign">
                <div className="col-md-12 mb-3">
                    {infoMessage.length > 0 && <h3 className='infoMessage'>{infoMessage}</h3>}
                    <h3>Add Zone</h3>
                </div>
                <div className="col-md-4 col-sm-12 mb-2">
                    <label for="inputStateteam" className="form-label">Select Zone</label>
                    <select id="inputStateteam" className="form-select" name="zone_name" onChange={handleFormData} required>
                        <option value="">Choose...</option>
                        <option value="Dhaka" >Dhaka</option>
                        <option value="Khulna" >Khulna</option>
                        <option value="Chittagong" >Chittagong</option>
                        <option value="Barishal" >Barishal</option>
                        <option value="Rajshahi" >Rajshahi</option>
                        <option value="Rangpur" >Rangpur</option>
                        <option value="Mymensingh" >Mymensingh</option>
                        <option value="Sylhet" >Sylhet</option>
                    </select>
                </div>

                <div className="col-md-4 col-sm-12 mb-2">
                    <label for="sub_zone" className="form-label">Sub-zone</label>
                    <input type="text" name="sub_zone" className="form-control" id="sub_zone" placeholder='sub-zone name' onChange={handleFormData} required />
                </div>



                <div className="col-md-12 col-sm-12 mb-3 mt-5">
                    <div className="submitButton">
                        <button type="submit" >Add Zone</button>
                    </div>
                </div>
            </form>

            <div className="row divDesign py-5">

                {dhakaZone?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Dhaka Sub_zone List</p>
                        </div>
                        {dhakaZone?.map(z => {
                            return (


                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>


                            )
                        })}
                    </div>
                }

                {Khulna?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5 ">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Khulna Sub_Zone List</p>
                        </div>
                        {Khulna?.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }

                {Chittagong?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5 ">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Chittagong Sub_zone List</p>
                        </div>
                        {Chittagong?.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }

                {Barishal?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Barishal Sub_zone List</p>
                        </div>
                        {Barishal.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}

                    </div>
                }
                {Rajshahi?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Rajshahi Sub_zone List</p>
                        </div>
                        {Rajshahi.length > 0 && Rajshahi.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }
                {Rangpur?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Rangpur Sub_zone List</p>
                        </div>
                        {Rangpur.length > 0 && Rangpur.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }
                {Sylhet?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Sylhet Sub_zone List</p>
                        </div>
                        {Sylhet.length > 0 && Sylhet.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }
                {Mymensingh?.length > 0 &&
                    <div className="col-md-3 col-sm-12 mb-5">
                        <div className='mt-4 mb-4'>
                            <p className='headingBar'>Mymensingh Sub_zone List</p>
                        </div>
                        {Mymensingh.length > 0 && Mymensingh.map(z => {
                            return (
                                <div className="zoneList">
                                    {z.sub_zone ? <p>{z.sub_zone} </p> : <p>0</p>}
                                    <span onClick={() => handleSubZoneDelete(z._id)}><MdDeleteSweep /></span>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}


export default AddZone;