import React, { FC } from "react"
import { View, Image } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SCREENS } from "navigation/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountCard from "./components/AccountCard";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { logout } from "store/reducers/authReducer";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { Images } from "resources/Images";
import CustomText from "components/CustomText";
import { Colors } from "constants/Colors";
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
                        borderWidth: 3,
                        borderColor: Colors["color-primary-200"]
                    }}
                />
                <CustomText style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "600",
                    marginVertical: responsiveHeight(10),

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