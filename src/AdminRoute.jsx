import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export function AdminRoute ({ children })  {
    const { user } = useAuth();
    
    const currentLocation = useLocation();
   
    const esAdmin = user?.role === 'admin';
    

    return esAdmin ? (
        children
    ) : (
        <Navigate to="/" state={{ from: currentLocation }} replace />
    );
}