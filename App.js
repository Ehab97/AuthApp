import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignUpScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { Colors } from "./src/constants/styles";
import { AuthContext, AuthContextProvider } from "./src/store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./src/components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./src/components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCTX = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => {
            return <IconButton icon={"exit"} color={tintColor} size={24} onPress={authCTX.logout} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCTX = useContext(AuthContext);
  return <NavigationContainer>{authCTX.isAuthnticated ? <AuthenticatedStack /> : <AuthStack />}</NavigationContainer>;
}

const Root = () => {
  const authCTX = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const fetchToken = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        authCTX.authenticate(token);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (loading) return <LoadingOverlay message={`Checking user authentication...`} />;

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
