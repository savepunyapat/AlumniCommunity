import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const[token, setToken] = useState(Cookies.get("token"));
  console.log(token);

  const storeTokenInLS = (server_token) => {
    return Cookies.set("token", server_token);
  };
  let isLoggedIn = !!token;
  const LogoutUser = () =>{
    setToken("");
    return Cookies.remove('token',{path:'/'});
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};   

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  return AuthContextValue;
}
export default AuthContext;