import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "./Navigation";
import { responsiveHeight } from "constants/Dimension";
import { NavigationProp } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import AccountScreen from "screens/Account";
import MarketScreen from "screens/MarketScreen/MarketScreen";
import WalletScreen from "screens/Wallet/WalletScreen";

const Tab = createBottomTabNavigator();
interface Props {
    navigation: NavigationProp<any, any>
}
const BottomTabNavigator = (props: Props) => {
    return (
        <Tab.Navigator
            initialRouteName={SCREENS.HomeScreen}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,

                tabBarIcon: ({ focused, color }) => {
                    let iconName = "";
                    if (route.name === SCREENS.HomeScreen) {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === SCREENS.MarketScreen) {
                        iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
                    }
                    else if (route.name === SCREENS.WalletScreen) {
                        iconName = focused ? 'credit-card' : 'credit-card-outline';
                    }
                    else if (route.name === SCREENS.AccountScreen) {
                        iconName = focused ? "person" : "person-outline";
                    }
                    return <Icon name={iconName} height={responsiveHeight(30)} width={responsiveHeight(30)} fill={color} />;
                },
            })}>
            <Tab.Screen
                name={SCREENS.MarketScreen}
                component={MarketScreen}
                options={{
                    title: "Market",
                }}
            />
            <Tab.Screen
                name={SCREENS.HomeScreen}
                component={HomeScreen}
                options={{
                    title: "Ana Sayfa",
                }}
            />
            <Tab.Screen
                name={SCREENS.WalletScreen}
                component={WalletScreen}
                options={{
                    title: "Cüzdan",
                }}
            />
            <Tab.Screen
                name={SCREENS.AccountScreen}
                component={AccountScreen}
                options={{
                    title: "Hesabım",
                }}
            />

        </Tab.Navigator>
    )
};
export default BottomTabNavigator;