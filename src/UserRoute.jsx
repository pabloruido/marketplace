import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export function UserRoute ({ children })  {
    const { user } = useAuth();
    
    const currentLocation = useLocation();
   
    const esUser = user !== null;
    

    return esUser ? (
        children
    ) : (
        <Navigate to="/" state={{ from: currentLocation }} replace />
    );
}