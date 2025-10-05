import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import GetStartedScreen from "./app/auth/GetStartedScreen";
import Welcome from "./app/auth/Welcome";
import PhoneNumberPage from "./app/auth/PhoneNumberPage";
import VerifyPhoneNumber from "./app/auth/VerifyPhoneNumber";
import VerifyEmailAdress from "./app/auth/VerifyEmailAdress";
import PersonalInformation from "./app/auth/PersonalInformation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#545EE1" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="PersonalInformation"
      >
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberPage} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
        <Stack.Screen name="VerifyEmailAddress" component={VerifyEmailAdress} />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
