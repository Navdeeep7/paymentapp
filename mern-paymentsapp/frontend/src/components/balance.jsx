import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";
export function Balance() {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const [loading,setLoading]=useState(false);
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
          if(response.data){
            setLoading(false);
           }
          
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Error fetching balance", error);
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <div className="m-2 text-xl font-semibold p-2 border-2 rounded-lg border-gray-200 mt-4 inline-block sm:text-2xl lg:text-5xl flex items-center">
            Balance: Rs {balance}<RiseLoader color="#404040" loading={loading} size={15}/>
        </div>
  );
}
