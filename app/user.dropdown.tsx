"use client"

import { UserButton } from "@clerk/nextjs"
import { ChartColumnIncreasing } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDropdown () {
    const router = useRouter();
    return ( 
    <UserButton showName appearance={{
        elements: {
            userButtonOuterIdentifier: {
              color: "white"  
            },
        },
    }}
    >
        <UserButton.MenuItems>
          <UserButton.Action label="Dashboard" labelIcon={<ChartColumnIncreasing size={16} />}
          onClick={() => {
            router.push("/dashboard");
          }} 
          />  
        </UserButton.MenuItems>
    </UserButton>
);
}