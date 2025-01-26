import React,{createContext ,useContext , useEffect,useState} from 'react'
import axios from 'axios'
import RenderRoutes from '../Componenets/Structure/RenderRoutes';
import { useNavigate } from 'react-router-dom'
//create the authcontext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? 
        JSON.parse(savedUser) 
        : { email: '', isAuthenticated: false, token: null, role: null, id: null };
    });
    
    useEffect(()=>{
        if(user && user.isAuthenticated){
            localStorage.setItem('user', JSON.stringify(user));
        }
        else{
            localStorage.removeItem('user');
        }
    }, [user])

const login = async (email, password) => {  
  if (email && password) {
    try {
      if (email === "user@gmail.com" && password === "user") {
        const id = 1;
        const role = "user";
        const accessToken = 'seifislem';  // This would be the actual token from the backend

        if (role) {
          navigate("/Users");  // Navigate to Dashboard
        } else {
          console.log("Unhandled role");
        }

        // Set user details (could be handled with context or state)
        setUser({
          email,
          isAuth: true,
          token: accessToken,
          role: 'user',
          id,
        });
      }
    } catch (err) {
      console.log('Login error:', err);  // Handle error
    }
  } else {
    console.log('Please provide email and password');
  }
};

    const logout = () =>{
        setUser({
            email:'',isAuth:false,
            token:null,
            role:null
        })
        localStorage.removeItem('user')
    }
  return (
    <AuthContext.Provider value={{user,login,logout}}>
      <RenderRoutes/>
    </AuthContext.Provider>
  )
}

export default AuthWrapper
