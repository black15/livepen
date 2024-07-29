import { SignIn } from "@clerk/nextjs";
import React from "react";

const Login = () => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default Login;
