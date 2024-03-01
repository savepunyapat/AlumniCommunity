import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { axiosWithTokenReq } from "../services/service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const[token, setToken] = useState(Cookies.get("token"));
  const [userName, setUserName] = useState("");
  const [permission,setPermission] = useState('');
    

  const getUserName = async () => {
    try {
      const response = await axiosWithTokenReq.get("me");
      setUserName(response?.data.FirstName);
      setPermission(response?.data.Permission);
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
  let isAdmin = permission === "admin";
  const LogoutUser = () =>{
    setToken("");
    return Cookies.remove('token',{path:'/'});
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, userName,permission,isAdmin ,storeTokenInLS, LogoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};   

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  return AuthContextValue;
}
export default AuthContext;