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
  id: string | null;
  name: string | null;
  role: string | null;
  setId: (id: string | null) => void;
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
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Load data dari localStorage saat pertama kali
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    if (storedId) setId(storedId);
    if (storedName) setName(storedName);
    if (storedRole) setRole(storedRole);
  }, []);

  // Simpan ke localStorage setiap kali berubah
  useEffect(() => {
    if (id) localStorage.setItem("id", id);
    else localStorage.removeItem("id");

    if (name) localStorage.setItem("name", name);
    else localStorage.removeItem("name");

    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [id, name, role]);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setId(null);
    setName(null);
    setRole(null);
  };

  return (
    <RoleContext.Provider value={{ id, name, role, setId, setName, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};
