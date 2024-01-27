import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/Auth/LoginScreen";
import RegisterScreen from "screens/Auth/RegisterScreen";
import { useAppSelector } from "store/Hooks";
import API from "API/Instance";
import BottomTabNavigator from "./BottomTabNavigator";
import AccountDeleteScreen from "screens/Account/AccountDeleteScreen";
import PasswordChangeScreen from "screens/Account/PasswordChangeScreen";
import PersonalInfoScreen from "screens/Account/PersonalInfoScreen";
import IbanTransferScreen from "screens/Wallet/IbanTransferScreen";
import PastIbanTransfers from "screens/Wallet/PastIbanTransfers";
import PastDaysStepScreen from "screens/HomeScreen/PastDaysStepScreen";
import PastMarketOrders from "screens/Wallet/PastMarketOrders";
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
            <Stack.Screen name={SCREENS.PastDaysStepScreen} component={PastDaysStepScreen} />
            <Stack.Screen name={SCREENS.IbanTransferScreen} component={IbanTransferScreen} />
            <Stack.Screen name={SCREENS.PastIbanTransfers} component={PastIbanTransfers} />
            <Stack.Screen name={SCREENS.PastMarketOrders} component={PastMarketOrders} />

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
    PastDaysStepScreen = "PastDaysStepScreen",
    WalletScreen = "WalletScreen",
    IbanTransferScreen = "IbanTransferScreen",
    PastIbanTransfers = "PastIbanTransfers",
    PastMarketOrders = "PastMarketOrders",
}
export default Navigation;