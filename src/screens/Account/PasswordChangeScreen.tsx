import React, { FC, useReducer } from "react"
import { Alert, ScrollView, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import CustomText from "components/CustomText";
import { API_ChangePassword } from "API/API";
interface Props {
    navigation: NavigationProp<any, any>
}

interface IState {
    oldPassword: string
    oldPasswordValid: boolean
    newPassword: string
    newPasswordAgain: string
    newPasswordValid: boolean
    newPasswordAgainValid: boolean
    newPasswordSame: boolean
}
const initialState: IState = {
    oldPassword: "",
    oldPasswordValid: true,
    newPassword: "",
    newPasswordAgain: "",
    newPasswordValid: true,
    newPasswordAgainValid: true,
    newPasswordSame: false,

};
interface IAction {
    type: "SET_OLD_PASSWORD" | "SET_OLD_PASSWORD_VALID" | "SET_NEW_PASSWORD" | "SET_NEW_PASSWORD_AGAIN" | "SET_NEW_PASSWORD_VALID" | "SET_NEW_PASSWORD_AGAIN_VALID" | "SET_NEW_PASSWORD_SAME";
    payload: string | boolean;
}
const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case 'SET_OLD_PASSWORD':
            return { ...state, oldPassword: action.payload as string };
        case 'SET_OLD_PASSWORD_VALID':
            return { ...state, oldPasswordValid: action.payload as boolean };
        case 'SET_NEW_PASSWORD':
            return { ...state, newPassword: action.payload as string };
        case 'SET_NEW_PASSWORD_AGAIN':
            return { ...state, newPasswordAgain: action.payload as string };
        case 'SET_NEW_PASSWORD_VALID':
            return { ...state, newPasswordValid: action.payload as boolean };
        case 'SET_NEW_PASSWORD_AGAIN_VALID':
            return { ...state, newPasswordAgainValid: action.payload as boolean };
        case 'SET_NEW_PASSWORD_SAME':
            return { ...state, newPasswordSame: action.payload as boolean };
        default:
            return state;
    }
};

const PasswordChangeScreen: FC<Props> = (props) => {
    const PasswordUpdate = () => {
        if (state.oldPassword == "" || state.newPassword != state.newPasswordAgain || !(state.newPassword.trim().length >= 6) || !(state.newPasswordAgain.trim().length >= 6)) {
            dispatch({ type: "SET_OLD_PASSWORD_VALID", payload: state.oldPassword != "" });
            dispatch({ type: "SET_NEW_PASSWORD_SAME", payload: state.newPassword != state.newPasswordAgain });
            dispatch({ type: "SET_NEW_PASSWORD_VALID", payload: (state.newPassword.trim().length >= 6) });
            dispatch({ type: "SET_NEW_PASSWORD_AGAIN_VALID", payload: (state.newPasswordAgain.trim().length >= 6) });
        }
        else {
            API_ChangePassword({
                current_password: state.oldPassword,
                new_password: state.newPassword,
            })
                .then(async (res) => {
                    props.navigation.goBack();

                }).catch((err) => {
                    Alert.alert("Hata Oluştu", err.message);
                })
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleOldPasswordChange = (text: string) => {
        dispatch({ type: "SET_OLD_PASSWORD", payload: text });
        dispatch({ type: "SET_OLD_PASSWORD_VALID", payload: text != "" });
    };
    const handleNewPasswordChange = (text: string) => {
        dispatch({ type: "SET_NEW_PASSWORD", payload: text });
        dispatch({ type: "SET_NEW_PASSWORD_VALID", payload: text.trim().length >= 6 });
        dispatch({ type: "SET_NEW_PASSWORD_SAME", payload: text != state.newPasswordAgain });

    };
    const handleNewPasswordAgainChange = (text: string) => {
        dispatch({ type: "SET_NEW_PASSWORD_AGAIN", payload: text });
        dispatch({ type: "SET_NEW_PASSWORD_AGAIN_VALID", payload: text.trim().length >= 6 });
        dispatch({ type: "SET_NEW_PASSWORD_SAME", payload: text != state.newPassword });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title={"Şifremi Değiştir"} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, marginHorizontal: responsiveWidth(20) }}>
                    <View style={{
                        alignItems: "center",
                        height: responsiveWidth(50),
                    }}>
                    </View>
                    <CustomInput
                        title="Eski Şifreniz"
                        type="password"
                        errorText="Şifreniz en az 6 karakter olmalıdır."
                        error={!state.oldPasswordValid}
                        value={state.oldPassword}
                        placeholder="Eski Şifrenizi Giriniz"
                        onChangeText={handleOldPasswordChange}
                        viewStyle={{ marginBottom: responsiveHeight(20) }}
                    />
                    <CustomInput
                        title="Yeni Şifreniz"
                        type="password"
                        error={!state.newPasswordValid}
                        errorText="Şifreniz en az 6 karakter olmalıdır"
                        value={state.newPassword}
                        placeholder="Yeni Şifrenizi Giriniz"

                        onChangeText={handleNewPasswordChange}
                        viewStyle={{ marginBottom: responsiveHeight(20) }}
                    />
                    <CustomInput
                        title="Yeni Şifreniz (Tekrar)"
                        type="password"
                        error={!state.newPasswordAgainValid}
                        errorText="Şifreniz en az 6 karakter olmalıdır"
                        value={state.newPasswordAgain}
                        placeholder="Yeni Şifrenizi (Tekrar) Giriniz"
                        onChangeText={handleNewPasswordAgainChange}
                        viewStyle={{}}
                    />
                    {((state.newPasswordValid && state.newPasswordAgainValid) && state.newPasswordSame) &&
                        <CustomText style={{ marginTop: responsiveHeight(10), color: "red" }}>Yeni şifreniz tekrarı ile aynı olmalıdır.</CustomText>
                    }
                    <CustomButton
                        size="large"
                        style={{ marginTop: responsiveHeight(30) }}
                        onPress={PasswordUpdate}
                    >Şifremi Değiştir</CustomButton>
                </View>
                <View style={{ height: responsiveHeight(125) }} />
            </ScrollView>

        </SafeAreaView>
    )
}
export default PasswordChangeScreen;