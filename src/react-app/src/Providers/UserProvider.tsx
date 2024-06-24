import React, { createContext, useContext, useState } from 'react';
import {User} from "../models/User.ts";

const UserContext = createContext(User);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
);
}