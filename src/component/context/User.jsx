import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext=createContext({});
export function UserContextProvider({children}){

    const [userToken,setUserToken]=useState(null);
    const [userData,setUserData]=useState(null);
    const [userId,setUserId]=useState(null);
    const [loading,setLoading]=useState(true);
    console.log(userData);
    // console.log("userToken="+userToken);
    const getUserData=async ()=>{
        // setLoading(true);
        if(userToken)
        {
            const {data}=await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`);
            setUserData(data.data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUserData();
    },[userToken])


   return <UserContext.Provider value={{setUserToken,setUserId,loading,setLoading,userToken,userData,setUserData,userId}}>
        {children}
    </UserContext.Provider>
}