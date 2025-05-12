import React from 'react'
import { RiEditCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

export const PropTeamMember = ({ team }) => {
    const userdata = JSON.parse(secureLocalStorage.getItem('user') || '[]')
    return (

        <div className='col-md-4 col-sm-12'>
            <div class="card mb-5 boxDesign ">
                <div class="card-footer bg-success text-white">
                    Name : {team.user_name}
                </div>
                <ul class="list-group list-group-flush p-2">
                    <li class="list-group-item">ID: {team.user_id}</li>
                    <li class="list-group-item">Designation: {team.user_designation}</li>
                    <li class="list-group-item">Zone: {team.user_zone}</li>
                    <li class="list-group-item">Sub Zone: {team.sub_zone}</li>
                    <li class="list-group-item">Next: {team.next_responsible_person}</li>
                    <li class="list-group-item">Dpt: {team.user_department}</li>
                    <li class="list-group-item">Next Id: {team.next_responsible_person_id}</li>
                    <li class="list-group-item">Next Name: {team.next_responsible_person}</li>
                    <li class="list-group-item">Access level: {team.user_access_level}</li>
                </ul>
                <div class="card-footer ">
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
