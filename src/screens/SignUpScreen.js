import React, { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { authenticate, createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { firbaseUrlModes } from "../constants/config";
import { Alert } from "react-native";

function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const signupHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await createUser(email, password);
      console.log(res);
    } catch (error) {
      console.log("signupScreen.js error: ", error);
      Alert.alert("Signup Failed", "Please check your entered credentials.");
    }
    setLoading(false);
  };

  if (loading) return <LoadingOverlay message={`Creating user...`} />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
