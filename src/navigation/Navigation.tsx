import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import LoginScreen from "screens/Auth/LoginScreen";
import RegisterScreen from "screens/Auth/RegisterScreen";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import API from "API/Instance";
import BottomTabNavigator from "./BottomTabNavigator";
import AccountDeleteScreen from "screens/Account/AccountDeleteScreen";
import PasswordChangeScreen from "screens/Account/PasswordChangeScreen";
import PersonalInfoScreen from "screens/Account/PersonalInfoScreen";
const Stack = createNativeStackNavigator();
const Navigation = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    useEffect(() => {
        API.setAuthorizationHeader(token);
    }, []);

    return (
        <NavigationContainer>
            {user ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name={SCREENS.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={SCREENS.RegisterScreen} component={RegisterScreen} />
        </Stack.Navigator>
    )
}
const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name={SCREENS.BottomTabNavigator} component={BottomTabNavigator} />

            <Stack.Screen name={SCREENS.PersonalInfoScreen} component={PersonalInfoScreen} />
            <Stack.Screen name={SCREENS.PasswordChangeScreen} component={PasswordChangeScreen} />
            <Stack.Screen name={SCREENS.AccountDeleteScreen} component={AccountDeleteScreen} />
        </Stack.Navigator>
    )
}
export enum SCREENS {
    LoginScreen = "LoginScreen",
    RegisterScreen = "RegisterScreen",
    BottomTabNavigator = "BottomTabNavigator",
    HomeScreen = "HomeScreen",
    AccountScreen = "AccountScreen",
    PersonalInfoScreen = "PersonalInfoScreen",
    PasswordChangeScreen = "PasswordChangeScreen",
    AccountDeleteScreen = "AccountDeleteScreen",
    MarketScreen = "MarketScreen",
}
export default Navigation;