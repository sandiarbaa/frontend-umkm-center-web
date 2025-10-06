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
  name: string | null;
  role: string | null;
  setName: (name: string | null) => void;
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
export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Load name & role dari localStorage saat pertama kali
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    if (storedName) setName(storedName);
    if (storedRole) setRole(storedRole);
  }, []);

  // Simpan name & role ke localStorage setiap kali berubah
  useEffect(() => {
    if (name) localStorage.setItem("name", name);
    else localStorage.removeItem("name");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [name, role]);

  // Hapus semua data saat logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setName(null);
    setRole(null);
  };

  return (
    <RoleContext.Provider value={{ name, role, setName, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};
