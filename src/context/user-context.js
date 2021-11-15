import { createContext, useState, useEffect, useCallback } from "react";

import jwtDecode from "jwt-decode";
import DataService from "../services/data.service";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const refreshToken = useCallback(async ()=>{
    console.log('in global')
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await DataService.getUserData();
      if(user && user.accessToken){
          const expires_in = jwtDecode(user.accessToken).exp;
          setTimeout(() => {
            console.log(Date.now > expires_in*1000)
            refreshToken();
          },((expires_in-1) * 1000) -Date.now());
      }
      setUserData(user);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setShow(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);
  
  function handleUserUpdate(user) { 
    console.log('in update')
    if(user && user.accessToken){
      const expires_in = jwtDecode(user.accessToken).exp;  
      setTimeout(() => {
        refreshToken();
      }, ((expires_in-1) * 1000) -Date.now());
    }
    setUserData(user)
  }

  const context = {
    user: userData,
    setUser: handleUserUpdate,
    isLoading,
  };

  return (
    <UserContext.Provider value={context}>
      {show ? children : null}
    </UserContext.Provider>
  );
}

export default UserContext;
