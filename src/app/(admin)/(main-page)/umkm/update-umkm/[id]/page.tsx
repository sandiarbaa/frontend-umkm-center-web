"use client"

import DefaultInputsUpdateUmkm from "@/components/form/form-elements/DefaultInputsUpdateUmkm";
import DefaultInputsUpdateUmkmOwner from "@/components/form/form-elements/DefaultInputsUpdateUmkmOwner";
import { useRole } from "@/context/RoleContext";

export default function UpdateUmkmPage() {
  const { role } = useRole()
  
  return (
    <div>
      {role === 'admin' ? <DefaultInputsUpdateUmkm /> : <DefaultInputsUpdateUmkmOwner />}
    </div>
  );
}
