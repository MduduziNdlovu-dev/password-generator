import { Toaster } from "sonner"
import Home from "./pages/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider, useAuth } from "./context/AuthContext"

const PrivateRoute = ({children}: {children: React.ReactNode}) => {
  const {token} = useAuth();
  return token ? children : <Navigate to="/login" />
}
function App() {

  return (
    <>
    <AuthProvider>
      <Toaster position="top-right" richColors />
      
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>     
    </AuthProvider>
    </>
  )
}

export default App
