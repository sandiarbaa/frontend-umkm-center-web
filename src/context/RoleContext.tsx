"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ====== TYPE ======
type RoleContextType = {
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
};

// ====== CONTEXT ======
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// ====== HOOK ======
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

// ====== PROVIDER ======
export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(null);

  // Load role dari localStorage saat pertama kali
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  // Simpan role ke localStorage setiap kali berubah
  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};
