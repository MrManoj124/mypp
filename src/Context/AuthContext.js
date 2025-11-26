import {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [user, setUser]=useState(null); 
  const [token, setToken]=useState(localStorage.getItem('token'));
  const [loading, setLoading]=useState(true);
  const [isAuthenticated, setIsAuthenticated]=useState(false);

  useEffect(()=>{
    const initAuth=async()=>{
        const savedToken=localStorage.getItem('token');
        if(savedToken){
            try{    
                setToken(savedToken);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        initAuth();
    },[]);

    const login=(userData, authToken)=>{    
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
        localStorage.setItem('token', userToken);
    };

    const logout=()=>{
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const updateUser=(userData)=>{
        setUser(userData)
    };

    const value={user, token, loading, isAuthenticated, login, logout, updateUser};

    return(
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

