import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Balance() {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

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

          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Error fetching balance", error);
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <div className="m-2 text-xl font-semibold p-2 border-2 rounded-lg border-gray-200 mt-4 inline-block sm:text-2xl lg:text-5xl">
            Balance: Rs {balance}
        </div>
  );
}
