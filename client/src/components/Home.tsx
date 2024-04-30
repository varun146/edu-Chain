import React from "react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button"
export function HomePage() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl flex flex-col gap-6  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          EduChain
        </h1>
        <div className="flex gap-4 justify-center">
          <Link href="/issue-route">
            <Button variant="outline">Issue</Button>
          </Link>
          <Link href="/verify-route">
            <Button variant="outline">Verify</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

