import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import axioInstance from "@app/utils/axios";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
      console.log('in private routes...')
      // TODO: set auth here
            setIsAuth(true);
  }, [])
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
