import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function PrivateRoute() {
    const userdata = JSON.parse(secureLocalStorage.getItem("userInfo") || "[]");
    return userdata.isLoggedIn == true ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;