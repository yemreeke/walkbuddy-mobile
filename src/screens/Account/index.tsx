import React, { FC } from "react"
import { View, Image, Alert } from "react-native"
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { SCREENS } from "navigation/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import AccountCard from "./components/AccountCard";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { logout } from "store/reducers/authReducer";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { Images } from "resources/Images";
import { API_GetUserInfo } from "API/API";
import CustomText from "components/CustomText";
interface Props {
    navigation: NavigationProp<any, any>
}
const AccountScreen: FC<Props> = ({ navigation }) => {
    const appDispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);
    const onLogout = () => {
        appDispatch(logout())
    };

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginTop: responsiveHeight(10) }}>
                <Image
                    source={Images.default}
                    style={{
                        alignSelf: "center",
                        marginTop: responsiveHeight(20),
                        width: responsiveWidth(100),
                        height: responsiveWidth(100),
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: "#AAA"
                    }}
                />
                <CustomText style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "600",
                }}>{`${user?.name} ${user?.surname}`}</CustomText>
                <AccountCard text="Kişisel Bilgiler" icon="person-outline" onPress={() => navigation.navigate(SCREENS.PersonalInfoScreen)} />
                <AccountCard text="Şifremi Değiştir" icon="lock-outline" onPress={() => navigation.navigate(SCREENS.PasswordChangeScreen)} />
                <AccountCard text="Hesabımı Sil" icon="trash-2-outline" onPress={() => navigation.navigate(SCREENS.AccountDeleteScreen)} />
                <AccountCard text="Çıkış Yap" icon="log-out-outline" onPress={onLogout} />
            </View>
        </SafeAreaView>
    )
}
export default AccountScreen;