import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import axios from "axios";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
      const token = localStorage.getItem('auth_token');
      axios.post('http://localhost:8000/api/get-user', {
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
