import React from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

export const PropTeamMember = ({ team }) => {
    const userdata = JSON.parse(secureLocalStorage.getItem('user') || '[]')
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
                            <button type="submit" >Update Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
