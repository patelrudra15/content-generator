"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion

function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  // Hide header on the dashboard page
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }} // Animation starts from above and invisible
      animate={{ y: 0, opacity: 1 }} // Slides down into place and becomes visible
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      className="px-10 lg:px-32 xl:px-20 2xl:px-56 p-4 flex justify-between items-center shadow-sm bg-white"
    >
      <Image src={"/logo.svg"} alt={"logo"} width={180} height={100} />
      <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
        <Button>Sign-in</Button>
      </SignInButton>
    </motion.div>
  );
}

export default Header;
