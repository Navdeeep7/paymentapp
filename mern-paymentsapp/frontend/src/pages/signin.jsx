import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { SubHeading } from "../components/subheading"
import { Button } from "../components/button"
import BottomWarning from "../components/bottomwarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signin=()=>{
   const navigate=useNavigate();
  const [username,setUsername]=useState("admin@gmail.com");
  const [password,setPassword]=useState("admin12");
  function click(){
      axios.post("https://mern-paymentapp.vercel.app/api/v1/user/signin",{
         username,
         password
      }).then((res)=>{
         alert(res.data.msg);
         localStorage.setItem("token",res.data.token);
         navigate("/dashboard");
      })
     
  }
    return(
        <div className="bg-gray-400 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
       <Heading label={"Sign in"}/>
       <SubHeading label={"Enter your information to access your account"}/>
       <InputBox label={"Email"} value={username} onChange={(e)=>{
          setUsername(e.target.value)}} placeholder={"Enter your email"}/>
       <InputBox label={"Password"} value={password} onChange={(e)=>{
          setPassword(e.target.value)}} placeholder={"Enter your password"}/>
       <div className="m-2">
        <Button label={"Sign in"} onClickHandle={click}></Button>
       </div>
       <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
    </div>
    
  </div>
 
</div>
    )
}
