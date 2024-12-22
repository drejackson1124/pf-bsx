import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        passcode: "",
        showPosts: false,
    });

    const [posts, setPosts] = useState([]);

    return (
        <UserContext.Provider value={{ userCredentials, setUserCredentials, posts, setPosts }}>
            {children}
        </UserContext.Provider>
    );
};
