import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ChartColumnIncreasing } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center bg-white relative">
      <Image src="/cover.webp2.png" 
      fill 
      className="object-cover opacity-100" 
      alt="Cover image" 
      />
      {/* dark overlay to brighten text foregroun */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 text-center flex flex-col gap-4">
        <h1 className="text-6xl font-bold flex gap-1 items-center justify-center">
          <ChartColumnIncreasing className="text-lime-500" size={70} /> CashFlowX
        </h1>
        <p className="text-xl font-semibold">
          Track your finances with ease and maintain full visibility of your cash flow!
        </p>
        <SignedIn>
          <div className="flex justify-center">
          <Button asChild size="lg" className="w-fit bg-lime-400 hover:bg-lime-500">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2 items-center justify-center">
            <Button asChild size="lg" className="bg-lime-400 hover:bg-lime-500">
              <SignInButton />
            </Button>
            <Button asChild size="lg">
            <SignUpButton />
            </Button>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
