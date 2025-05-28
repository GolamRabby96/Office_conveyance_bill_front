import React from 'react'
import secureLocalStorage from 'react-secure-storage';

export const LandingPage = () => {
    const userdata = JSON.parse(secureLocalStorage.getItem("userInfo") || "[]");

    console.log(userdata);

    return (
        <>
            <div className='container headerCover'>
                <div className="row ">
                    <div className="col-md-12">
                        <h5 className='shadow p-5 bg-info rounded'>Hello {userdata.user_name}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default LandingPage;