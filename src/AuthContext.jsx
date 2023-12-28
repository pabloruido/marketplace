import React, { createContext, useContext, useEffect, useState } from 'react';


export const AuthContext = createContext();



export const useAuth = () => {
  return useContext(AuthContext);
};

const getProfile = async (accessToken) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const userData = await response.json();
  return userData;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
      const storageUser = localStorage.getItem('user');
      const storedUserId = localStorage.getItem('userId');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      if (storedUserId) {
        setUserId(parseInt(storedUserId, 10));
      }
    }, [] );
  
    const login = async (userData) => {
      setUser(userData);
  
      const accessToken = userData.access_token;
  
      try {
        const profileData = await getProfile(accessToken);
        setUser(profileData);
        localStorage.setItem('user', JSON.stringify(profileData));
        localStorage.setItem('userId', profileData.id);
        setUserId(profileData.id);
        console.log(profileData.id)
      } catch (error) {
        console.error('Error al obtener la data:', error);
      }
    };
  
    const register = (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    };
  
    return (
      <AuthContext.Provider value={{ user, userId, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };