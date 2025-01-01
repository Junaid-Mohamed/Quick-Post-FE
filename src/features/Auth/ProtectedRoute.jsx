/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { baseURL } from "../../config/constants";
import { clearUser, setUser } from "./authSlice";



const ProtectedRoute= ({children}) => {
    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

    const dispatch = useDispatch();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const verifyToken = async () => {
            const token = localStorage.getItem("QP-authToken");
            if(!token){
                dispatch(clearUser());
                toast.error("Please login")
                setIsLoading(false)
                return;
            }
            try{
                const response = await axios.get(`${baseURL}/api/auth/signin`,{
                    headers: {Authorization: `Bearer ${token}`}
                })
                dispatch(setUser(response.data.user))
            }catch(error){
                console.log(error);
                dispatch(clearUser());
            }finally{
                setIsLoading(false);
            }
        }
        if(!isAuthenticated){
            verifyToken();
        }
        
    },[isAuthenticated, dispatch])

    if(isLoading){
        return <div>Loading....</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return <>{children}</>;
    
}

export default ProtectedRoute;