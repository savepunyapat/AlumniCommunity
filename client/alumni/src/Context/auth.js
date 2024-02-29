import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { axiosWithTokenReq } from "../services/service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const[token, setToken] = useState(Cookies.get("token"));
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const response = await axiosWithTokenReq.get("me");
      setUserName(response?.data.FirstName);
      return response?.data.FirstName;
    } catch (error) {
      console.log(error);
    }
  };
  if (token) {
    getUserName();
  }
  const storeTokenInLS = (server_token) => {
    return Cookies.set("token", server_token);
  };
  let isLoggedIn = !!token;
  const LogoutUser = () =>{
    setToken("");
    return Cookies.remove('token',{path:'/'});
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, userName ,storeTokenInLS, LogoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};   

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  return AuthContextValue;
}
export default AuthContext;