import React, { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      console.log(res);
    } catch (error) {}
    setLoading(false);
  };

  if (loading) return <LoadingOverlay message={`user logiing in...`} />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
