import React, { FC, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "components/CustomInput";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import { ValidateEmail } from "utils/ValidateEmail";
import { API_Register } from "API/API";
import { useAppDispatch } from "store/Hooks";
import { login } from "store/reducers/authReducer";
interface Props {
}
const RegisterScreen: FC<Props> = (props) => {
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const appDispatch = useAppDispatch();

    const onRegister = () => {
        if (name.trim().length == 0) {
            Alert.alert("Hata Oluştu", "Ad alanı boş bırakılamaz");
            return;
        }
        if (surname.trim().length == 0) {
            Alert.alert("Hata Oluştu", "Soyad alanı boş bırakılamaz");
            return;
        }
        if (!ValidateEmail(email)) {
            Alert.alert("Hata Oluştu", "Geçerli bir e-posta adresi giriniz");
            return;
        }
        if (password.trim().length < 6) {
            Alert.alert("Hata Oluştu", "Şifreniz en az 6 karakterden oluşmalıdır");
            return;
        }
        API_Register({
            name,
            surname,
            email,
            password,
        }).then((res) => {
            appDispatch(login({
                token: res.data.token,
                user: res.data.user,
            }))
        }
        ).catch((err) => {
            Alert.alert("Hata Oluştu", err.message);
        })

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title="Kayıt Ol" />
            <View
                style={{
                    flex: 1,
                    marginTop: responsiveHeight(50),
                    alignItems: "center",
                }}
            >
                <ScrollView>

                    <CustomInput
                        title="Ad"
                        placeholder="Ad"
                        value={name}
                        onChangeText={setName}
                        viewStyle={{
                            marginTop: responsiveHeight(20),
                            width: responsiveWidth(320),
                        }}
                    />
                    <CustomInput
                        title="Soyad"
                        placeholder="Soyad"
                        value={surname}
                        onChangeText={setSurname}
                        viewStyle={{
                            marginTop: responsiveHeight(20),
                            width: responsiveWidth(320),
                        }}
                    />
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
                        onPress={onRegister}
                        style={{
                            marginTop: responsiveHeight(40),
                            width: responsiveWidth(320),
                        }}
                    >Kayıt Ol</CustomButton>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default RegisterScreen;