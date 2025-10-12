"use client";
import { useRole } from "@/context/RoleContext";

export default function UserDropdown() {
  const { name, role } = useRole();

  return (
    <div className="relative">
      <span className="block mr-1 font-medium text-theme-sm">
          <p className="font-semibold text-lg">{name}</p>
          {role === 'admin' ? (
            <p>{role}</p>
          ) : (role === 'owner') ? (
            <p>{role}</p>
          ) : (
            <p>{role}</p>
          )}
        </span>
    </div>
  );
}
