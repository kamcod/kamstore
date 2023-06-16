import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import axios from "axios";
import { urls } from "@app/utils/urls";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
      const token = localStorage.getItem('auth_token');
      axios.post(urls.GET_USER, {
          headers: {
              "Authorization": token
          }
      })
          .then(res => {
              if(res.status === 200){
                  setIsAuth(true);
              }
          })
          .catch(err => {
              console.log(err);
              setIsAuth(false);
          })
  }, [])

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
