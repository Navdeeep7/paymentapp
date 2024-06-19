import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
export const Landingpage=()=>{
  const navigate=useNavigate();
    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
          <motion.div 
            className="bg-white p-10 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to Payments app
            </motion.h1>
            <motion.p 
              className="text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Your trusted partner for secure and easy payments.
            </motion.p>
            <motion.button
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/dashboard")}
            >
              Explore 
            </motion.button>
          </motion.div>
        </div>
    )
      
}