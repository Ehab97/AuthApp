import React, { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const authCTX = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      authCTX.authenticate(res.idToken);
      console.log(res);
    } catch (error) {
      console.log("loginScreen.js error: ", error);
      Alert.alert("Login Failed", "Please check your entered credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay message={`user logiing in...`} />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
