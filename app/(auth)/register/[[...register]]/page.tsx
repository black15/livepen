import { SignUp } from "@clerk/nextjs";
import React from "react";

const Register = () => {
  return (
    <main className="auth-page">
      <SignUp />
    </main>
  );
};

export default Register;
