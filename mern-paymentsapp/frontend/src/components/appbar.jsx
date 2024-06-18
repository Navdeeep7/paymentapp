import { useEffect, useState } from "react"
import axios from "axios";
import { Button } from "./button";
import { Transactions } from "../pages/transactions";
import { useNavigate } from "react-router-dom";
export function Appbar(){
  const [name,setName]=useState("");
  const [token,setToken]=useState(localStorage.getItem("token"));
  const navigate=useNavigate();
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (token) {
          

          const response = await axios.get(
            "http://localhost:3000/api/v1/account/balance",
            
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setName(response.data.name);
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
                Armaan Pay
              </div>
              <div className="m-2 font-semibold text-lg flex flex-col items-center sm:text-2xl sm:flex-row">
              
                <div className="m-2 self-end  sm:self-auto">Hello {name}</div>
                <div><Button label={"Transactions"} onClickHandle={click}/>
                <Button label={"Logout"} onClickHandle={clicklogout}></Button></div>
              </div>
            </div>
          )
    
}