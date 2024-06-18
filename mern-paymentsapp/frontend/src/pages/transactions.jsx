import { useEffect, useState } from "react";
import axios from "axios";
var sent=false;
export const Transactions=()=>{
    const [history,setHistory]=useState([])
    const [token,setToken]=useState(localStorage.getItem("token"))
    useEffect(()=>{
        const fetchHistory=async()=>{
        
            axios.get("http://localhost:3000/api/v1/account/history", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((res)=>{
                console.log(res.data.history);
                 setHistory(res.data.history);
                 
              })
    
        }
        fetchHistory();
    },[])

 return(
    <div>
        <div className="">
    <div className="text-center text-4xl font-semibold m-2">Transactions history</div>
    {/* <div className="m-2 border-2 rounded-lg flex justify-between items-center">
      <div className="">
        <div className="p-2 text-2xl font-semibold">description</div>
      <div className="pl-2">date</div>
      <div className="pl-2">time</div>
      </div>
      <div className="p-2 text-5xl font-semibold">amount</div>
    </div> */}
    {history.map((transaction)=>{
        
        const mode=transaction.description.split(" ")[0];
        console.log("Mode"+mode);
        var sent;
        if(mode==="Sent"){
            sent=true;
        }
        return(
            <div className="m-2 border-2 rounded-lg flex justify-between items-center">
      <div className="">
        <div className="p-2 text-2xl font-semibold">{transaction.description}</div>
      <div className="pl-2">Date:{transaction.date}</div>
      <div className="pl-2">Time:{transaction.time}</div>
      </div>
      <div className="p-2 text-2xl font-semibold sm:text-4xl">{sent ? '-' : '+'} Rs {transaction.amount}</div>
    </div>
        )
    })}
</div>
    </div>
 )
    
}