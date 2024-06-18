import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let mounted = true; // Flag to track if component is mounted
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
         
        );
        if (mounted) { // Check if component is still mounted before updating state
          setUsers(response.data.user);
          console.log(users);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data', error);
        }
      }
    };

    fetchData();

    // Cleanup function to cancel async operation if component unmounts
    return () => {
      mounted = false;
    };
  }, [filter]); // useEffect dependency
 const navigate=useNavigate();
  return (
    <div className="p-2">
      <div className="text-lg font-semibold">
        Users
      </div>
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        type="text"
        placeholder="Search users..."
        className="border-2 rounded-lg p-1 w-full"
      />
      <hr className="mt-1 border-gray-100" />
      
      <div className='flex flex-col '>
      {users.map(function(user){ 
        return(<div key={user._id}  className=''>
          <div className="flex justify-between mt-2 border p-2 rounded-lg ">
          <div className="flex items-center">
            <div className="bg-gray-500 w-8 h-8 flex justify-center items-center text-white font-semibold rounded-full">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="font-semibold ml-2">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div>
            <button
              type="button" onClick={(e)=>{
                navigate("/sendmoney?id="+user._id+"&name="+user.firstName);

              }}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Send Money
            </button>
          </div>
          
        </div>
         </div>

          
        )
      })}
      </div>
    </div>
  );
}
