import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/assets/images/logo.png";
import { AppProps } from "next/app";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src={Logo}
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:block"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
