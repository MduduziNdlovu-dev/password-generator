import { Toaster } from "sonner"
import Home from "./pages/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider, useAuth } from "./context/AuthContext"
import GeneratePage from "./pages/GeneratePage"
import SavedPasswordsPage from "./pages/SavedPasswordsPage"

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
        <Route path="/" element={<GeneratePage />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/saved" element={<SavedPasswordsPage/>} />
        <Route path="*" element={<Navigate to="/" />} />  
      </Routes>     
    </AuthProvider>
    </>
  )
}

export default App
