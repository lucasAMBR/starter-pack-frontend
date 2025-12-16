"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies"; // Importação nova

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_NAME = "access_token"; 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { [COOKIE_NAME]: storedToken } = parseCookies();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);

    setCookie(null, COOKIE_NAME, newToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      // secure: process.env.NODE_ENV === 'production', // Opcional: só envia em HTTPS
      // sameSite: 'lax', // Controle de envio entre sites
    });
  };

  const logout = () => {
    setToken(null);
    
    destroyCookie(null, COOKIE_NAME, {
        path: '/'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}