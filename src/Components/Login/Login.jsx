import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";
import Cookies from "universal-cookie";
import { UserContext } from '../../App';
import adnLogo from '../../images/adnLogo.png'


const Login = () => {
    const { setLoggedInUser } = useContext(UserContext);
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [messageInfo, SetMessageInfo] = useState("");


    const handleUserForm = (e) => {
        const data = { ...userInfo };
        data[e.target.name] = e.target.value;
        setUserInfo(data);
    };


    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/findUser/${userInfo.user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo)
        })
            .then((res) => res.json())
            .then((data) => {
                const apiData = data.data;
                if (data.userFlag == true) {
                    setLoggedInUser({
                        isLoggedIn: true,
                        user_name: apiData.user_name,
                        user_id: apiData.user_id,
                        sub_zone: apiData.sub_zone,
                        next_responsible_person_id: apiData.next_responsible_person_id,
                        next_responsible_person: apiData.next_responsible_person,
                        user_designation: apiData.user_designation,
                        user_access_level: apiData.user_access_level,
                        amount_limit: apiData.amount_limit
                    })
                    secureLocalStorage.setItem("userInfo", JSON.stringify({
                        isLoggedIn: true,
                        user_name: apiData.user_name,
                        user_id: apiData.user_id,
                        sub_zone: apiData.sub_zone,
                        next_responsible_person_id: apiData.next_responsible_person_id,
                        next_responsible_person: apiData.next_responsible_person,
                        user_designation: apiData.user_designation,
                        user_access_level: apiData.user_access_level,
                        amount_limit: apiData.amount_limit
                    }));
                    SetMessageInfo(data.message);
                    navigate('/');
                    window.location.reload();
                } else {
                    SetMessageInfo(data.message);
                    alert("User ID or Password incorrect");
                }
            })
            .catch((error) => {
                alert("User ID or Password incorrect");
            });
        e.target.reset();

    }

    setTimeout(function () {
        SetMessageInfo("");
    }, 6000);

    return (
        <section className="h-100 gradient-form loginBackgroupColor">
            <div className="container-fluid py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black shadow">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img className='imageLogo' src={adnLogo} />
                                            <h4 className="mt-1 mb-5 pb-1">ADN TELECOM LTD</h4>
                                        </div>

                                        <form onSubmit={handleLogin}>
                                            <p>Please login to your account</p>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onBlur={handleUserForm} type="text" name="user_id" className="form-control" id="user_id"
                                                    placeholder="Enter your Job Id" required />
                                                <label className="form-label" for="form2Example11">Job ID</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleUserForm} type="password" className="form-control" name="user_password" id="password" placeholder='' autocomplete="off" required />
                                                <label className="form-label" for="form2Example22">Password</label>
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3  px-5" type="submit">Log in</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Connecting THE world with the most reliable partner</h4>
                                        <p className="small mb-0">ADN Telecom Limited, the flagship company of ADN Group, is Bangladesh’s leading, fully integrated telecommunications service provider, with a strong infrastructure base that supports flawless connectivity. For over a decade, ADN Telecom has played a pivotal role in connecting people and businesses through evolving communication technologies, reflecting the nation’s rapid economic growth and advancements in the telecommunications industry</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;