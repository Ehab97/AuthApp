import React, { useContext, useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const authCTX = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const signupHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await createUser(email, password);
      authCTX.authenticate(res.idToken);
      console.log(res);
    } catch (error) {
      console.log("signupScreen.js error: ", error);
      Alert.alert("Signup Failed", "Please check your entered credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay message={`Creating user...`} />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
