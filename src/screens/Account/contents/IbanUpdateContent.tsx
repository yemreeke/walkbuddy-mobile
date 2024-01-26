import React, { FC, useState } from "react"
import { Alert, View } from "react-native"
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import AlertDialog from "components/AlertDialog";
import { API_UpdateProfile } from "API/API";
import { updateUserInfo } from "store/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "store/Hooks";
interface Props {

}
const IbanUpdateContent: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const appDispatch = useAppDispatch();

    const [iban, setIban] = useState(user?.iban_no || "");
    const handleIbanChange = (value: string) => {
        setIban(value);
    };

    const update = () => {
        if (user) {
            API_UpdateProfile({
                name: user.name,
                surname: user.surname,
                iban_no: iban ?? undefined,
                email: user.email,
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
                title="Iban"
                value={iban}
                placeholder={"Iban adresi giriniz"}
                viewStyle={{ marginTop: responsiveHeight(10) }}
                onChangeText={handleIbanChange}
            />
            <CustomButton
                onPress={update}
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
export default IbanUpdateContent;