import { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
var sent=false;
export const Transactions=()=>{
    const [history,setHistory]=useState([])
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const fetchHistory=async()=>{
          setLoading(true);
        
            axios.get("https://mern-paymentapp.vercel.app/api/v1/account/history", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((res)=>{
                console.log(res.data.history);
                 setHistory(res.data.history);
                 setLoading(false);
              })
    
        }
        fetchHistory();
    },[])

 return(
    <div>
        <div className="">
    <div className="text-center text-2xl font-semibold m-2 mb-4  sm:text-4xl">Transactions history</div>
    {/* <div className="m-2 border-2 rounded-lg flex justify-between items-center">
      <div className="">
        <div className="p-2 text-2xl font-semibold">description</div>
      <div className="pl-2">date</div>
      <div className="pl-2">time</div>
      </div>
      <div className="p-2 text-5xl font-semibold">amount</div>
    </div> */}
     {loading ? (
        <div><div className="flex justify-center items-center mt-40"><PulseLoader
        color="#484848" loading={loading} size={20}
      /></div></div>
      ) : (
        <div> {history.map((transaction)=>{
        
          const mode=transaction.description.split(" ")[0];
          console.log("Mode"+mode);
          var sent;
          if(mode==="Sent"){
              sent=true;
          }
          return(
              <div className="m-2 border-2 rounded-lg flex justify-between items-center">
        <div className="">
          <div className="p-2 text-xl font-semibold sm:text-2xl">{transaction.description}</div>
        <div className="pl-2">Date:{transaction.date}</div>
        <div className="pl-2 mb-2">Time:{transaction.time}</div>
        </div>
        <div className="p-2 text-2xl font-semibold sm:text-4xl">{sent ? '-' : '+'} Rs {transaction.amount}</div>
      </div>
          )
      })}</div>
      )}


   
</div>
    </div>
 )
    
}