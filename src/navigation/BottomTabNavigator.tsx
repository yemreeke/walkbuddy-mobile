import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "./Navigation";
import { responsiveHeight } from "constants/Dimension";
import { NavigationProp } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import HomeScreen from "screens/HomeScreen";
import AccountScreen from "screens/Account";

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
                    // else if (route.name === SCREENS.ActiveRacesScreen) {
                    //     iconName = focused ? 'list' : 'list-outline';
                    // }
                    // else if (route.name === SCREENS.StartRaceQrScreen) {
                    //     iconName = focused ? 'flag' : 'flag-outline';
                    // }
                    // else if (route.name === SCREENS.RaceResults) {
                    //     iconName = focused ? "hash" : 'hash-outline';
                    // }
                    // else if (route.name === SCREENS.AccountScreen) {
                    //     iconName = focused ? "person" : "person-outline";
                    // }
                    else if (route.name === SCREENS.AccountScreen) {
                        iconName = focused ? "person" : "person-outline";
                    }
                    return <Icon name={iconName} height={responsiveHeight(30)} width={responsiveHeight(30)} fill={color} />;
                },
            })}>
            <Tab.Screen
                name={SCREENS.HomeScreen}
                component={HomeScreen}
                options={{
                    title: "Ana Sayfa",
                }}
            />
            <Tab.Screen
                name={SCREENS.AccountScreen}
                component={AccountScreen}
                options={{
                    title: "Hesabım",
                }}
            />
            {/* <Tab.Screen
                name={SCREENS.ActiveRacesScreen}
                component={ActiveRacesScreen}
                options={{
                    title: "Yarışlarım",
                }}
            />
            <Tab.Screen
                name={SCREENS.StartRaceQrScreen}
                component={StartRaceQrScreen}
                options={{
                    title: "Yarışa Başla",
                }}
            />
            <Tab.Screen
                name={SCREENS.RaceResults}
                component={RaceResults}
                options={{
                    title: "Yarış Sonuçlarım",
                }}
            />
            <Tab.Screen
                name={SCREENS.AccountScreen}
                component={AccountScreen}
                options={{
                    title: "Hesabım",
                }}
            /> */}
        </Tab.Navigator>
    )
};
export default BottomTabNavigator;