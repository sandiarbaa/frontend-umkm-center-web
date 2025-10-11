"use client";

import DefaultInputsUmkm from "@/components/form/form-elements/DefaultInputsUmkm";
import DefaultInputsUmkmOwner from "@/components/form/form-elements/DefaultInputsUmkmOwner";
import { useRole } from "@/context/RoleContext";

export default function AddUmkmPage() {
  const { role } = useRole()
  
  return (
    <div>
      {role === 'admin' ? <DefaultInputsUmkm /> : <DefaultInputsUmkmOwner />}
    </div>
  );
}
