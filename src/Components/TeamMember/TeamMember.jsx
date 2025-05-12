import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PropTeamMember } from './PropTeamMember.jsx';

const TeamMember = () => {

    const [rowData, setRowData] = useState([]);
    const [userBoxVisible, setUserBoxVisible] = useState(true);

    useEffect(() => {
        teamMemberApi();
    }, [])

    const teamMemberApi = async () => {
        const response = await fetch('http://localhost:5000/api/getAllUser', {
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setRowData(data.data);
    }

    return (
        <div className='container headerCover' >
            {userBoxVisible ?
                <div className="row p-4 DivDesign" >
                    <>
                        {
                            rowData?.map(team => {
                                return (
                                    <PropTeamMember team={team} />
                                )
                            })
                        }
                    </>

                </div>
                :
                <div className="row p-4 divDesign " >
                    <div className='col-md-12'>
                        <p>No Data Found</p>
                    </div>
                </div>
            }

        </div >
    )
}

export default TeamMember;