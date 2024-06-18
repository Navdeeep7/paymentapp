import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import  axios  from "axios";
export const SendMoney=()=>{
  const navigate=useNavigate();
  const [response,setResponse]=useState({});
  const [isOpen, setIsOpen] = useState(false);
  const[loading,setLoading]=useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setLoading(true)
    console.log(loading)
      try{
        axios.request(config)
        .then((res) => {
        setResponse(res.data);
        setLoading(false);
        console.log(loading);
        })
      }  catch(error)  {
        console.log(error);
        } finally{
          
          
        }
        
      
     
      
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/dashboard");
  };
  const [amount,setAmount]=useState(0);
  const [searchParams]=useSearchParams();
  const id=searchParams.get("id");
  const name=searchParams.get("name");
  let data = {
    to:id,
    amount
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://mern-paymentapp.vercel.app/api/v1/account/transfer',
    headers: { 
      Authorization:"Bearer "+localStorage.getItem("token") || "empty"
    },
    data : data
  };

    return(
        <div>
            
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold text-center m-4 mt-8">Send money</h1>
          <div className="flex justify-start items-center w-36 mt-8 ml-8">
            <div className="bg-gray-500 w-8 h-8 flex justify-center items-center text-white font-semibold rounded-full">
            {name.charAt(0).toUpperCase()}
            </div>
            <div className="font-semibold ml-2">
              {name}
            </div>
          </div>
          <div className="ml-8 mt-2">Amount (in Rs)</div>
          <input onChange={(e)=>{
            setAmount(parseInt(e.target.value));
            
          }}
            type="text"
            name=""
            id=""
            placeholder="Enter amount..."
            className="border-2 rounded-lg p-1 ml-8 mr-8 w-80"
          />
          <div className="flex justify-center">
          <div className="relative">
      {/* Modal toggle button */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4"
        type="button"
        onClick={toggleModal}
      >
       Send Money
      </button>

      {/* Main modal */}
      {isOpen && (
        <div
          id="default-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 overflow-y-auto overflow-x-hidden"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-2xl">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900  ">
                  Payment Status
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b text-5xl text-white font-semibold">
                
  {loading ? (
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b text-black">
          <p>Loading...</p>
        </div>
      ) :(response.success && (
    <div className="text-black text-xl sm:text-4xl">
      {response.msg}
      <br />
       <div className="text-center mt-4 text-xl text-black sm:text-2xl"> Balance:{response.senderBalance}</div>
      
    </div>
  ))}
</div>
                </p>
                <p className="text-base leading-relaxed text-gray-500 ">
                   
                </p>
              </div>
              {/* Modal footer */}
              
            </div>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}