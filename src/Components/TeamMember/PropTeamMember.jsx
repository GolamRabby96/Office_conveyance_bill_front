import React, { useState } from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { data, Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

export const PropTeamMember = ({ team, loadComponent, setLoadComponent }) => {
    const userdata = JSON.parse(secureLocalStorage.getItem('user') || '[]')
    const navigate = useNavigate();
    const [flag, SetFlag] = useState(true);
    const [formData, SetFormData] = useState({});
    const [zoneData, setZoneData] = useState({});
    const [infoMessage, SetInfoMessage] = useState("");
    const [checkResponceButton, setCheckResponceButton] = useState(true);
    const [userCurrentId, setCurrentID] = useState("");



    const handleFormData = (e) => {
        const newData = { ...formData };
        newData[e.target.name] = e.target.value;
        SetFormData(newData);
    }

    // Click edit button and get user data
    const handleUpdateData = async (id) => {
        setCurrentID(id);
        const response = await fetch(`http://localhost:5000/api/getUser/${id}`, {
            credentials: 'include'
        })
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        SetFormData(data.data);
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

    // Paisi..................


    // Paisi..................
    const handleCheckPerson = async (value) => {
        if (value.length == 7) {
            const response = await fetch(`http://localhost:5000/api/getUser/${value}`, {
                credentials: 'include'
            });
            if (!response.ok) {
                setCheckResponceButton(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.data == false) {
                setCheckResponceButton(false);
            }

            if (data.data) {
                const nameData = data.data;
                const next_responsible_person = nameData.user_name;
                SetFormData(formData.next_responsible_person_id = value);
                const newData = { ...formData, next_responsible_person: next_responsible_person };
                SetFormData(newData);
                setCheckResponceButton(true);
            }
        } else {
            setCheckResponceButton(false);
        }
    }

    // Update user
    const updateUserInfo = async (req, res) => {
        fetch(`http://localhost:5000/api/updateUser/${userCurrentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then((res) => res.json)
            .then((data) => {
                window.alert("User Updated");
                setLoadComponent(!loadComponent)
            })
    }

    // Delete user from the data base
    const deleteUserInfo = async (req, res) => {
        const response = await fetch(`http://localhost:5000/api/deleteUser/${userCurrentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        if (data?.operations) {
            window.alert("User Updated");
            setLoadComponent(!loadComponent)
        }
    }

    // setTimeout(function () {
    //     SetInfoMessage("");
    // }, 6000);
    return (

        <div key={team._id} className='col-md-4 col-sm-12'>
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

                    <li className="list-group-item">User Priority: {team.user_priority}</li>
                    <li className="list-group-item">Amount limit: {team.amount_limit}</li>

                </ul>
                <div className="card-footer ">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="silimaButton">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${team._id}`} onClick={() => handleUpdateData(team.user_id)} >Modify</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade " key={team._id} id={team._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Info</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='container'>
                                <div className="row g-3 pb-2">

                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for={team.user_name} className="form-label">Name</label>
                                        <input type="text" name="user_name" value={formData.user_name} className="form-control" id={team.user_name} placeholder='Team member name' onChange={handleFormData} disabled />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for={team.user_id} className="form-label">User Id</label>
                                        <input type="text" name="user_id" value={formData.user_id} className={`form-control idCurrection${flag}`} id={team.user_id} placeholder='EX-1010822' onChange={(e) => { handleFormData(e); checkMemberId(e) }} disabled />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for={team.user_designation} className="form-label">Designation</label>
                                        <select id={team.user_designation} name="user_designation" className="form-select" onChange={handleFormData} required>
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
                                        <label for="user_zone" className="form-label">Zone</label>
                                        <select id="user_zone" name="user_zone" className="form-select" onChange={(e) => { handleFormData(e); handleZoneData(e.target.value) }} required>
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
                                        <label for="sub_zone" className="form-label">Sub-Zone</label>
                                        <select id="sub_zone" name="sub_zone" className="form-select" onChange={handleFormData}>
                                            <option value={formData.sub_zone} className='text-info'>{formData.sub_zone}</option>
                                            <option value="">Choose...</option>
                                            {zoneData.length > 0 && zoneData.map(z => <option value={z.sub_zone}>{z.sub_zone}</option>)}
                                        </select>
                                    </div>



                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="user_department" className="form-label">Department</label>
                                        <select id="user_department" name="user_department" className="form-select" onChange={handleFormData} required>
                                            <option value={formData.user_department} className='text-info'>{formData.user_department}</option>
                                            <option value="">Choose...</option>
                                            <option value="Architecture_&_Planning">Architecture & Planning</option>
                                            <option value="Accounts">Accounts</option>
                                            <option value="Accounts">Audit</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="next_responsible_person_id" className="form-label">Next Responsible Person</label>
                                        <input type="text" name="next_responsible_person_id" onChange={(e) => { handleCheckPerson(e.target.value), handleFormData(e) }} value={formData.next_responsible_person_id} className="form-control" id="next_responsible_person_id" placeholder='Responsible Member Id' required />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="user_access_level" className="form-label">Access Level ...</label>
                                        <select id="user_access_level" name="user_access_level" className="form-select" onChange={handleFormData} required>
                                            <option value={formData.user_access_level} className='text-info'>{formData.user_access_level}</option>
                                            <option value="">Choose...</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Moderator">Moderator</option>
                                            <option value="Team">Team</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="user_priority" className="form-label">Priority</label>
                                        <select id="user_priority" name="user_priority" className="form-select" onChange={handleFormData} required>
                                            <option value={formData.user_priority} className='text-info'>{formData.user_priority}</option>
                                            <option value="">Choose...</option>
                                            <option value="Team">Team</option>
                                            <option value="Supervisor">Supervisor</option>
                                            <option value="Unit_Head">Unit_Head</option>
                                            <option value="Section_Head">Section_Head</option>
                                            <option value="Department_Head">Department_Head</option>
                                            <option value="Account_Audit">Account_Audit</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-2">
                                        <label for="amount_limit" className="form-label">Amount Limit</label>
                                        <select id="amount_limit" name="amount_limit" className="form-select" onChange={handleFormData} required>
                                            <option value={formData.amount_limit} className='text-info'>{formData.amount_limit}</option>
                                            <option value="">Choose...</option>
                                            <option value="1800">1800</option>
                                            <option value="3000">3000</option>
                                            <option value="0">Not Applicable</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {checkResponceButton ?
                            <div class="modal-footer">
                                <button class="btn btn-danger" data-bs-dismiss="modal" onClick={deleteUserInfo}>Delete-{formData.user_name}</button>
                                <button class="btn btn-primary" data-bs-dismiss="modal" onClick={updateUserInfo}>Updated changes</button>
                            </div>
                            :
                            <div class="modal-footer">
                                <button class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                <button class="btn btn-danger">Next id not found</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}


