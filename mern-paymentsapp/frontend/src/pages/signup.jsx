import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { SubHeading } from "../components/subheading"
import { Button } from "../components/button"
import BottomWarning from "../components/bottomwarning"
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
   const navigate= useNavigate();
   const [firstName,setFirstName]=useState("");
   const [lastName,setLastName]=useState("");
   const [username,setUsername]=useState("");
   const [password,setPassword]=useState("");
    return(
        <div className="bg-gray-400 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
       <Heading label={"Sign up"}/>
       <SubHeading label={"Enter your information to create an account"}/>
       <InputBox label={"First Name"} onChange={(e)=>{
          setFirstName(e.target.value)

       }} placeholder={"Enter your first name"}/>
       <InputBox label={"Last Name"}  
       onChange={(e)=>{
          setLastName(e.target.value)}} 
          placeholder={"Enter your last name"}/>

       <InputBox label={"Email"} onChange={(e)=>{
          setUsername(e.target.value)}} placeholder={"Enter your email"}/>

       <InputBox label={"Password"} onChange={(e)=>{
          setPassword(e.target.value)}} placeholder={"Enter your password"}/>

       <div className="m-2">
        <Button label={"Sign up"} onClickHandle={async()=>{
          const response=await axios.post("https://mern-paymentapp.vercel.app/api/v1/user/signup",{
            username,
            firstName,
            lastName,
            password
          })
          localStorage.setItem("token",response.data.token);
          if(response.data.success){
            navigate("/dashboard");
          }
         

        }}></Button>
       </div>
       <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"}/>
    </div>
    
  </div>
 
</div>
    )
}