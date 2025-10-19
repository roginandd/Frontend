import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import GetStartedScreen from "./app/auth/GetStartedScreen";
import Welcome from "./app/auth/Welcome";

import LoginScreen from "./app/auth/login-screen/LoginScreen";
import ForgotPasswordScreen from "./app/auth/login-screen/ForgotPasswordScreen";
import VerifyEmail from "./app/auth/login-screen/VerifyEmail";
import CustomerNavigationBar from "./app/customer/CustomerNavigationBar";
import CourierNavigationBar from "./app/courier/CourierNavigationBar";
import Home from "./app/customer/CustomerHome";
import Orders from "./app/customer/Orders";
import LocationPicker from "./components/LocationPicker";
import OrderHistory from "./app/customer/OrderHistory";
import Settings from "./components/Settings";
import ChangePassword from "./app/auth/ChangePassword";
import CourierHome from "./app/courier/CourierHome";
import OrderList from "./app/courier/OrderList";
import CourierTrackingView from "./app/courier/CourierTrackingView";
import RegisterStack from "./app/auth/RegisterStack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#545EE1" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="GetStarted"
      >
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />

        {/* Registration flow — wrapped with Registration Context */}
        <Stack.Screen name="RegisterFlow" component={RegisterStack} />

        {/* Auth & App Screens */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen
          name="CustomerNavigationBar"
          component={CustomerNavigationBar}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="LocationPicker" component={LocationPicker} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen
          name="CourierNavigationBar"
          component={CourierNavigationBar}
        />
        <Stack.Screen name="CourierHome" component={CourierHome} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen
          name="CourierTrackingView"
          component={CourierTrackingView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
