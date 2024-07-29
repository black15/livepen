import Image from "next/image";
import React from "react";
import loader from "../public/assets/icons/loader.svg";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src={loader}
        alt="Loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      <div>Loading ...</div>
    </div>
  );
};

export default Loader;
