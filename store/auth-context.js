import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//set default value to help with autocompletion
//base context object will hold token and boolean if signed in, two methods to check authentication and logout (erase token)
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { }
});

//managing auth state 
function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  //triggered when user logged in or sign up successfully
  function authenticate(token) {
    setAuthToken(token);
    //key and item as string
    AsyncStorage.setItem('token', token)
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  //value object passed to all context users
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;