import { createContext, useContext, useEffect, useState } from "react";
import User from "../../../server/models/User";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
