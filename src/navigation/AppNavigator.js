// AppNavigator.js
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import ProfileScreen from "../screens/ProfileScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              onLogout={() => setIsLoggedIn(false)}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {() => <AuthNavigator onLoginSuccess={() => setIsLoggedIn(true)} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
 