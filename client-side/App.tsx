import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GetStartedScreen from "./app/auth/GetStartedScreen";
import Welcome from "./app/auth/Welcome";
import LoginScreen from "./app/auth/login-screen/LoginScreen";
import ForgotPasswordScreen from "./app/auth/login-screen/ForgotPasswordScreen";
import VerifyEmail from "./app/auth/login-screen/VerifyEmail";
import CustomerNavigationBar from "./app/customer/CustomerNavigationBar";
import CourierNavigationBar from "./app/courier/CourierNavigationBar";
import RegisterStack from "./app/auth/RegisterStack";
import ChangePassword from "./app/auth/ChangePassword";
import { useAuthStore } from "./app/api/store/auth_store";
import { Role } from "./types/types";

const Stack = createNativeStackNavigator();

export default function App() {
  const { token, user, checkTokenValidity, refreshUser } = useAuthStore();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const hasVisited = await AsyncStorage.getItem("hasVisited");

        // 🔹 First-time launch or after clear cache
        if (!hasVisited) {
          await AsyncStorage.setItem("hasVisited", "true");
          setInitialRoute("GetStarted");
          return;
        }

        // 🔹 Returning user
        const valid = checkTokenValidity();
        if (!valid) {
          setInitialRoute("Welcome"); // or "LoginScreen"
          return;
        }

        // 🔹 Token valid: refresh user profile and route by role
        await refreshUser();
        const updatedUser = useAuthStore.getState().user;

        if (updatedUser?.currentRole === Role.COURIER) {
          setInitialRoute("CourierNavigationBar");
        } else if (updatedUser?.currentRole === Role.CUSTOMER) {
          setInitialRoute("CustomerNavigationBar");
        } else {
          setInitialRoute("Welcome");
        }
      } catch (err) {
        console.error("App init failed:", err);
        setInitialRoute("GetStarted");
      }
    };

    init();
  }, [token]);

  if (!initialRoute) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#545EE1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#545EE1" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="RegisterFlow" component={RegisterStack} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen
          name="CustomerNavigationBar"
          component={CustomerNavigationBar}
        />
        <Stack.Screen
          name="CourierNavigationBar"
          component={CourierNavigationBar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
