import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/assets/icons/logo.svg";
import LLogo from "../public/assets/icons/logo-icon.svg";
import { AppProps } from "next/app";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const Header = ({ children, classname }: HeaderProps) => {
  return (
    <div className={cn("header", classname)}>
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src={LLogo}
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
