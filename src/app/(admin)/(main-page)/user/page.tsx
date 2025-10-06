"use client"

import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter()

  return (
    <div>
      <h1>User Page</h1>

      <Button size="sm" variant="primary" onClick={() => router.push('/user/add-user')} className="my-5">
        Add User
      </Button>

      <BasicTableOne />
    </div>
  )
}