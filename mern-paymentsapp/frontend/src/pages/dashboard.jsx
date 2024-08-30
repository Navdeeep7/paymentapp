import { useState,useEffect } from "react"
import { Appbar } from "../components/appbar"
import { Balance } from "../components/balance"
import { Users } from "../components/users"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader";



export const Dashboard=()=>{
    const[userexist,setUserexist]=useState(false);
    const navigate=useNavigate();
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [loading,setLoading]=useState(false)
    useEffect(() => {
      
        const fetchBalance =  () => {
          try {
            setLoading(true);
            
              
                axios.get(
                "https://mern-paymentapp.vercel.app/api/v1/account/balance",
                
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ).then((res)=>{
                if(!res.data.success){
                    navigate("/signin");
                    
                }
                else{
                  setUserexist(true);
                  setLoading(false);
                }
               
                
              });
    
              
            
          } catch (error) {
            console.error("Error fetching balance", error);
          }
        };
    
        fetchBalance();
        
      }, [token]);
    return(
        <div >
          {loading ? (<div className="flex justify-center pt-40">
          <PulseLoader
        color="#484848" loading={loading} size={20}
      />
          </div>):(<div>
           {userexist && (
        <div>
           <Appbar/>
            <Balance value={"9999"}/>
            <Users/>
        </div>
      )}
    </div>)}
           
             
            
           
        </div>

    )
}