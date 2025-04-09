import { createContext, useState } from "react";

export const DeviceContext=createContext();

const DeviceContextProvider=({children})=>
{

    const [deviceData,setDeviceData]=useState({
        device:"mobile",
        model:"",
        company:"",
        issues:[],
        description:"",
        address:"",
        date:"",
        mobileNo:"",
        serviceType:"",
        store:{
            storeName:"",
            appointment_day:"",
            appointment_time:"",
        }
    })

    return (
        <DeviceContext.Provider value={{deviceData,setDeviceData}}>
            {children}
        </DeviceContext.Provider>
    )
}

export default DeviceContextProvider;