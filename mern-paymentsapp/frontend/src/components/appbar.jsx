import { useEffect, useState } from "react"
import axios from "axios";
import { Button } from "./button";
import { Transactions } from "../pages/transactions";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";
export function Appbar(){
  const [name,setName]=useState("");
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        if (token) {
          

          const response = await axios.get(
            "https://mern-paymentapp.vercel.app/api/v1/account/balance",
            
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setName(response.data.name);
          if(response.data){
            setLoading(false);
           }
        }
      } catch (error) {
        console.error("Error fetching name", error);
      }
    };

    fetchBalance();
  }, [token]);
  function click(){
    navigate("/transactions")
  }
  function clicklogout(){
    localStorage.setItem("token","");
    setToken("");
    navigate("/signup");
  }
        return (
            <div className=" border-2 rounded-lg border-gray-200 m-2 flex justify-between">
              <div className="m-2 font-semibold text-lg self-center  sm:text-2xl">
                Payments App
              </div>
              <div className="m-2 font-semibold text-lg flex flex-col items-center sm:text-2xl sm:flex-row">
              
              <div className="m-2 self-end  sm:self-auto flex">Hello <RiseLoader color="#404040" loading={loading} size={10}/>{name}</div>
                <div><Button label={"Transactions"} onClickHandle={click}/>
                <Button label={"Logout"} onClickHandle={clicklogout}></Button></div>
              </div>
            </div>
          )
    
}