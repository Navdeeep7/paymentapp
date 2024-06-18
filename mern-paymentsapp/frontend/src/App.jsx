import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { SendMoney } from "./pages/sendmoney"
import { Landingpage } from "./pages/landingpage"
import { Transactions } from "./pages/transactions"
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/Sendmoney" element={<SendMoney/>}></Route>
          <Route path="/transactions" element={<Transactions/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
