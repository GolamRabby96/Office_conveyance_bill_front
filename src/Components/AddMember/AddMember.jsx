import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TeamMember from '../TeamMember/TeamMember';

export const AddMember = () => {
    const navigate = useNavigate();
    const [flag, SetFlag] = useState(true);
    const [formData, SetFormData] = useState({});
    const [zoneData, setZoneData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");
    const [checkResponce, setCheckResponce] = useState(false);
    const [checkResponceButton, setCheckResponceButton] = useState(false);

    console.log('-----------------------', checkResponce);

    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }

    const checkMemberId = async (e) => {
        let id = e.target.value;

        const response = await fetch(`http://localhost:5000/getUser/${id}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.data[0] == undefined || data.data[0] == null) {
            SetFlag(true);

        } else if (data.data[0].user_id == id) {
            SetInfoMessage("Already Taken");
            SetFlag(false);
        }
    }

    const handleZoneData = async (zData) => {
        const response = await fetch(`http://localhost:5000/api/getSubZone/${zData}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setZoneData(data.data);
    }

    const handleAddUserSubmit = (e) => {
        e.preventDefault();
        if (formData.user_id.length == 7) {

            if (flag) {
                fetch('http://localhost:5000/api/addUser', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                    credentials: 'include'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        SetInfoMessage(data.message);
                        SetFormData({});
                        navigate('/teamMember');
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                e.target.reset();
            } else {
                SetInfoMessage("Already Tacken");
            }
        } else {
            SetInfoMessage("ID length must be 7");

        }
    }
    const handleCheckPerson = async (e) => {
        const response = await fetch(`http://localhost:5000/api/getUser/${e.target.value}`, {
            credentials: 'include'
        });
        if (!response.ok) {
            setCheckResponce(false);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data == false) {
            setCheckResponceButton(false);
        }

        if (data.data) {
            const nameData = data.data;
            const next_responsible_person = nameData.user_name;
            const newData = { ...formData, next_responsible_person: next_responsible_person };
            SetFormData(newData);
            setCheckResponce(true);
            setCheckResponceButton(true);
        }
    }
    setTimeout(function () {
        SetInfoMessage("");
    }, 6000);
    return (
        <div className='container headerCover'>
            <form onSubmit={handleAddUserSubmit} className="row g-3 divDesign pb-2">
                <div className="col-md-12 mb-3">
                    {infoMessage.length > 0 && <h3 className='infoMessage'>{infoMessage}</h3>}
                    <h3 className='headingBar'>Add Team Member</h3>
                </div>
                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="user_name" className="form-label">Name</label>
                    <input type="text" name="user_name" className="form-control" id="user_name" placeholder='Team member name' onBlur={handleFormData} required />
                </div>
                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="inputPassword4" className="form-label">User Id</label>
                    <input type="text" name="user_id" className={`form-control idCurrection${flag}`} id="inputPassword4" placeholder='EX-1010822' onChange={(e) => { handleFormData(e); checkMemberId(e) }} required />
                </div>


                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="inputStatezone" className="form-label">Zone</label>
                    <select id="inputStatezone" name="user_zone" className="form-select" onChange={(e) => { handleFormData(e); handleZoneData(e.target.value) }} required="true">
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
                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="inputStatesubzone" className="form-label">Sub-Zone</label>
                    <select id="inputStatesubzone" name="sub_zone" className="form-select" onBlur={handleFormData}>
                        <option value="">Choose...</option>
                        {zoneData.length > 0 && zoneData.map(z => <option value={z.sub_zone}>{z.sub_zone}</option>)}
                    </select>
                </div>



                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="inputStateacess" className="form-label">Department</label>
                    <select id="inputStateacess" name="user_department" className="form-select" onBlur={handleFormData} required="true">
                        <option value="">Choose...</option>
                        <option value="Architecture_&_Planning">Architecture & Planning</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Accounts">Audit</option>
                    </select>
                </div>
                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="user_name" className="form-label">Next Responsible Person</label>
                    <input type="text" name="next_responsible_person_id" onBlur={handleCheckPerson} className="form-control" id="user_name" placeholder='Responsible Member Id' onChange={handleFormData} required />
                </div>
                <div className="col-md-3 col-sm-12 mb-2">
                    <label for="inputStateacess" className="form-label">Access Level ...</label>
                    <select id="inputStateacess" name="user_access_level" className="form-select" onChange={handleFormData} required="true">
                        <option value="">Choose...</option>
                        <option value="Team">Team</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Unit_Head">Unit Head</option>
                        <option value="Admin">Admin</option>
                        <option value="Accounts_Audit">Accounts_Audit</option>
                    </select>
                </div>

                {checkResponceButton ? <div className="col-md-12 col-sm-12 mb-3 mt-5">
                    <div className="submitButton">
                        <button type="submit" >Add Member</button>
                    </div>
                </div> :
                    <div className="submitButton">
                        <h6>Fill-Up the Form First ! </h6>
                    </div>
                }
            </form>
        </div>
    )
}

