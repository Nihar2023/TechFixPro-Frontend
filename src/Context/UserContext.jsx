import { createContext, useState } from "react";

export const UserContext=createContext();

const UserContextProvider=(props)=>{
    const [userData,setUserData]=useState({
        name:"",
        email:"", 
        mobile:"", 
        address:""
    });

    const value={
       userData,setUserData
    }


    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    )
}

export default UserContextProvider