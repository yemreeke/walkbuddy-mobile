import React, { FC, useState } from "react"
import { Alert, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "components/CustomInput";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomButton from "components/CustomButton";
import { NavigationProp } from "@react-navigation/native";
import { SCREENS } from "navigation/Navigation";
import CustomText from "components/CustomText";
import { API_Login } from "API/API";
import { useAppDispatch } from "store/Hooks";
import { login } from "store/reducers/authReducer";
import { ValidateEmail } from "utils/ValidateEmail";
interface Props {
    navigation: NavigationProp<any, any>,
}
const LoginScreen: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const appDispatch = useAppDispatch();
    const onLogin = () => {
        if (ValidateEmail(email) === false) {
            Alert.alert("Hata Oluştu", "Lütfen geçerli bir e-posta adresi giriniz");
            return;
        }
        if (password.trim().length < 1) {
            Alert.alert("Hata Oluştu", "Lütfen şifrenizi giriniz12");
            return;
        }
        API_Login({ email, password }).then((res) => {
            appDispatch(login({ token: res.data.token, user: res.data.user }))
        }).catch((err) => {
            Alert.alert("Hata Oluştu", err.message);
        })
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flex: 1,
                    marginTop: responsiveHeight(100),
                    alignItems: "center",
                }}
            >

                <View
                    style={{
                        height: responsiveWidth(200),
                        width: responsiveWidth(200),
                        backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                    }}
                >
                    <CustomText style={{ fontSize: 30, fontWeight: "700" }}>LOGO</CustomText>

                </View>
                <CustomInput
                    title="E-posta"
                    placeholder="E-posta"
                    value={email}
                    onChangeText={setEmail}
                    personIcon
                    viewStyle={{
                        marginTop: responsiveHeight(20),
                        width: responsiveWidth(320),
                    }}
                />
                <CustomInput
                    title="Şifre"
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    type="password"
                    viewStyle={{
                        marginTop: responsiveHeight(20),
                        width: responsiveWidth(320),
                    }}
                />
                <CustomButton
                    size="large"
                    onPress={onLogin}
                    style={{
                        marginTop: responsiveHeight(20),
                        width: responsiveWidth(320),
                    }}
                >Giriş Yap</CustomButton>
                <CustomButton
                    size="large"

                    onPress={() => navigation.navigate(SCREENS.RegisterScreen)}
                    style={{
                        marginTop: responsiveHeight(20),
                        width: responsiveWidth(320),
                    }}
                >Kayıt Ol</CustomButton>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen;