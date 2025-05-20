import React, { useState } from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

export const PropTeamMember = ({ team }) => {
    const userdata = JSON.parse(secureLocalStorage.getItem('user') || '[]')
    const navigate = useNavigate();
    const [flag, SetFlag] = useState(true);
    const [formData, SetFormData] = useState({});
    const [zoneData, setZoneData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");
    const [checkResponce, setCheckResponce] = useState(false);
    const [checkResponceButton, setCheckResponceButton] = useState(false);

    console.log(formData);

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

    const handleUpdateData = async (id) => {
        const response = await fetch(`http://localhost:5000/api/getUser/${id}`, {
            credentials: 'include'
        })
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        SetFormData(data.data);
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

    setTimeout(function () {
        SetInfoMessage("");
    }, 6000);
    return (

        <div className='col-md-4 col-sm-12'>
            <div className="card mb-5 boxDesign ">
                <div className="card-footer team-member-name-box">
                    Name : {team.user_name}
                </div>
                <ul className="list-group list-group-flush p-2 team-member-list">
                    <li className="list-group-item">ID: {team.user_id}</li>
                    <li className="list-group-item">Designation: {team.user_designation}</li>
                    <li className="list-group-item">Zone: {team.user_zone}</li>
                    <li className="list-group-item">Sub Zone: {team.sub_zone}</li>
                    <li className="list-group-item">Dpt: {team.user_department}</li>
                    <li className="list-group-item">Next Name: {team.next_responsible_person}</li>
                    <li className="list-group-item">Next Id: {team.next_responsible_person_id}</li>
                    <li className="list-group-item">Access level: {team.user_access_level}</li>
                </ul>
                <div className="card-footer ">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="silimaButton">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${team.user_id}`}>
                                <button onClick={()=>handleUpdateData(team.user_id)} >Update Info</button>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade " id={team.user_id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Info</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='container'>
                                <form onSubmit={handleAddUserSubmit} className="row g-3 pb-2">

                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="user_name" className="form-label">Name</label>
                                        <input type="text" name="user_name" value={formData.user_name} className="form-control" id="user_name" placeholder='Team member name' onChange={handleFormData} required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputPassword4" className="form-label">User Id</label>
                                        <input type="text" name="user_id" value={formData.user_id} className={`form-control idCurrection${flag}`} id="inputPassword4" placeholder='EX-1010822' onChange={(e) => { handleFormData(e); checkMemberId(e) }} required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputPassword4" className="form-label">Designation</label>
                                        <select id="user_designation" name="user_designation" className="form-select" onChange={handleFormData} required>
                                            <option value={formData.user_designation} className='text-info'>{formData.user_designation}</option>
                                            <option value="">Choose...</option>
                                            <option value="Cable_Man" >Cable_Man</option>
                                            <option value="Technician" >Technician</option>
                                            <option value="Asst_Manager" >Asst Manager</option>
                                            <option value="Engineer" >Engineer</option>
                                            <option value="Sr_Engineer" >Sr. Engineer</option>
                                            <option value="Asst_Manager" >Asst Manager</option>
                                            <option value="Manager" >Manager</option>
                                            <option value="Sr_Manager" >Sr. Manager</option>
                                            <option value="CTO" >CTO</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputStatezone" className="form-label">Zone</label>
                                        <select id="inputStatezone" name="user_zone" className="form-select" onChange={(e) => { handleFormData(e); handleZoneData(e.target.value) }} required="true">
                                            <option value={formData.user_zone} className='text-info'>{formData.user_zone}</option>
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
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputStatesubzone" className="form-label">Sub-Zone</label>
                                        <select id="inputStatesubzone" name="sub_zone" className="form-select" onChange={handleFormData}>
                                            <option value={formData.sub_zone} className='text-info'>{formData.sub_zone}</option>
                                            <option value="">Choose...</option>
                                            {zoneData.length > 0 && zoneData.map(z => <option value={z.sub_zone}>{z.sub_zone}</option>)}
                                        </select>
                                    </div>



                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputStateacess" className="form-label">Department</label>
                                        <select id="inputStateacess" name="user_department" className="form-select" onChange={handleFormData} required="true">
                                            <option value={formData.user_department} className='text-info'>{formData.user_department}</option>
                                            <option value="">Choose...</option>
                                            <option value="Architecture_&_Planning">Architecture & Planning</option>
                                            <option value="Accounts">Accounts</option>
                                            <option value="Accounts">Audit</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="user_name" className="form-label">Next Responsible Person</label>
                                        <input type="text" name="next_responsible_person_id" onChange={(e) => { handleCheckPerson(e.target.value), handleFormData(e) }} value={team.next_responsible_person_id} className="form-control" id="user_name" placeholder='Responsible Member Id' required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputStateacess" className="form-label">Access Level ...</label>
                                        <select id="inputStateacess" name="user_access_level" className="form-select" onChange={handleFormData} required="true">
                                            <option value={formData.user_access_level} className='text-info'>{formData.user_access_level}</option>
                                            <option value="">Choose...</option>
                                            <option value="Team">Team</option>
                                            <option value="Supervisor">Supervisor</option>
                                            <option value="Unit_Head">Unit Head</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Accounts_Audit">Accounts_Audit</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="inputStateacess" className="form-label">Access Level ...</label>
                                        <select id="inputStateacess" name="user_access_level" className="form-select" onChange={handleFormData} required="true">
                                            <option value={formData.user_access_level} className='text-info'>{formData.user_access_level}</option>
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>






    )
}


