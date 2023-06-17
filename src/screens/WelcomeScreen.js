import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { firbaseConfig } from "../constants/config";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const authCTX = useContext(AuthContext);
  const getWelcomeMessage = async () => {
    try {
      const res = await axios.get(firbaseConfig.URL + "message.json?auth=" + authCTX.token);

      setWelcomeMessage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, [authCTX.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{welcomeMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
