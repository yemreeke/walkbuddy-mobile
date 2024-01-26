import React, { FC, useState } from "react"
import { Alert, View } from "react-native"
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import AlertDialog from "components/AlertDialog";
import { ValidateEmail } from "utils/ValidateEmail";
import { API_UpdateProfile } from "API/API";
import { updateUserInfo } from "store/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "store/Hooks";
interface Props {

}
const EmailUpdateContent: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const appDispatch = useAppDispatch();

    const [email, setEmail] = useState(user?.email || "");
    const [emailValid, setEmailValid] = useState(true);
    const handleEmailChange = (value: string) => {
        setEmailValid(ValidateEmail(value));
        setEmail(value);
    };


    const handleUpdateNameSurname = () => {
        if (user) {
            API_UpdateProfile({
                name: user.name,
                surname: user.surname,
                iban_no: user.iban_no,
                email: email,
            })
                .then((response) => {
                    AlertDialog.dismiss();
                    appDispatch(updateUserInfo(response.data));
                })
                .catch((error) => {
                    Alert.alert("Hata Oluştu", error.message)
                });
        }
        else {
            Alert.alert("Hata Oluştu", "Kullanıcı bilgileri alınamadı")
        }

    };
    return (
        <View style={{ flex: 1, marginHorizontal: responsiveWidth(20) }}>
            <CustomInput
                autoCapitalize="none"
                title="E-Posta"
                personIcon
                error={!emailValid}
                errorText={"Geçerli bir e-posta adresi giriniz"}
                value={email}
                placeholder={"E-posta adresi giriniz"}
                viewStyle={{ marginTop: responsiveHeight(10) }}
                onChangeText={handleEmailChange}
            />
            <CustomButton
                disabled={(!ValidateEmail(email)) || (email === user?.email)}
                onPress={handleUpdateNameSurname}
                size="large"
                style={{
                    position: "absolute",
                    width: responsiveWidth(335),
                    bottom: responsiveHeight(50),
                }}
            >Güncelle</CustomButton>
        </View>
    )
}
export default EmailUpdateContent;