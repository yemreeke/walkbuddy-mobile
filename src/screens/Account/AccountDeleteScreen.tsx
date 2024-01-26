import React, { FC, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import AlertDialog from "components/AlertDialog";
import AccountDeleteContentConfirm from "contents/AccountDeleteContentConfirm";
import { API_AccountDelete } from "API/API";
import { useAppDispatch } from "store/Hooks";
import { logout } from "store/reducers/authReducer";
interface Props {
    navigation: NavigationProp<any, any>
}
const AccountDeleteScreen: FC<Props> = (props) => {
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const appDispatch = useAppDispatch();
    const AccountDeleteFunc = () => {
        if (password.trim().length < 6) {
            setPasswordValid(false);
            return;
        }
        AlertDialog.show({
            content: <AccountDeleteContentConfirm
                onDeletePress={() => {
                    AlertDialog.dismiss();
                    AccountDelete();
                }}
            />,
            mode: "CENTER"
        })
    };
    const AccountDelete = async () => {
        API_AccountDelete({
            current_password: password,
        }).then(async (res) => {
            appDispatch(logout());
        }).catch((err) => {
            Alert.alert("Hata Oluştu", err.message);
        })

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title="Hesabımı Sil" />
            <ScrollView>
                <View style={{ flex: 1, marginHorizontal: responsiveWidth(20) }}>
                    <View style={{ height: responsiveWidth(50), }}>
                    </View>
                    <CustomInput
                        error={!passwordValid}
                        errorText="Şifre en az 6 karakter olmalıdır"
                        title="Şifre"
                        type="password"
                        value={password}
                        placeholder="Şifre giriniz"
                        onChangeText={(value) => {
                            setPassword(value)
                            setPasswordValid(value.trim().length >= 6)
                        }}
                        viewStyle={{ marginBottom: responsiveHeight(30) }}
                    />
                    <CustomButton
                        onPress={AccountDeleteFunc}
                    >Hesabımı Sil</CustomButton>
                </View>
                <View style={{ height: 150 }} />
            </ScrollView>
        </SafeAreaView>
    )
}
export default AccountDeleteScreen;