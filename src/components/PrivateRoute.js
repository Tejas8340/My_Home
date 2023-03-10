import { Navigate, Outlet } from "react-router-dom";

import React from 'react';
import useAuthState from "./../hooks/useAuthState";
import Spinner from "./Spinner";

const PrivateRouter = () => {
    const {loggedIn, checkState} = useAuthState();

    if(checkState) {
        return <Spinner />;
    }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRouter