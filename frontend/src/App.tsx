import { Toaster } from "sonner"
import Home from "./pages/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>      
    </>
  )
}

export default App
