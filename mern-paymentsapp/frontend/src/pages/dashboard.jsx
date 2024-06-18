import { useState,useEffect } from "react"
import { Appbar } from "../components/appbar"
import { Balance } from "../components/balance"
import { Users } from "../components/users"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"


export const Dashboard=()=>{
    const[userexist,setUserexist]=useState(false);
    const navigate=useNavigate();
    const [token,setToken]=useState(localStorage.getItem("token"));
   
    useEffect(() => {
        const fetchBalance =  () => {
          try {
            
              
                axios.get(
                "https://mern-paymentapp.vercel.app/api/v1/account/balance",
                
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((res)=>{
                if(!res.data.success){
                    navigate("/signup");
                }
               
                
              });
    
              
            
          } catch (error) {
            console.error("Error fetching balance", error);
          }
        };
    
        fetchBalance();
        
      }, [token]);
    return(
        <div>

            <Appbar/>
            <Balance value={"9999"}/>
            <Users/>
        </div>

    )
}