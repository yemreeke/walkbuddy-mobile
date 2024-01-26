import React, { FC, useState } from "react"
import { Alert, View } from "react-native"
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import { updateUserInfo } from "store/reducers/authReducer";
import AlertDialog from "components/AlertDialog";
import { API_UpdateProfile } from "API/API";
import { useAppDispatch, useAppSelector } from "store/Hooks";
interface Props {

}
const NameSurnameUpdateContent: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const [name, setName] = useState<string>(user?.name || "");
    const [nameValid, setNameValid] = useState<boolean>(true);
    const [surname, setSurname] = useState<string>(user?.surname || "");
    const [surnameValid, setSurnameValid] = useState<boolean>(true);
    const appDispatch = useAppDispatch();

    const handleNameChange = (value: string) => {
        setNameValid(value.trim().length > 0);
        setName(value);
    };
    const handleSurnameChange = (value: string) => {
        setSurnameValid(value.trim().length > 0);
        setSurname(value);
    };

    const handleUpdateNameSurname = () => {
        API_UpdateProfile({
            name,
            surname,
            iban_no: user?.iban_no ?? "",
            email: user?.email ?? "",
        })
            .then((response) => {
                AlertDialog.dismiss();
                appDispatch(updateUserInfo(response.data));
            })
            .catch((error) => {
                Alert.alert("Hata Oluştu", error.message)
            });
    };
    return (
        <View style={{ flex: 1, marginHorizontal: responsiveWidth(20) }}>
            <CustomInput
                title={"Ad"}
                error={!nameValid}
                errorText={"Ad alanı boş bırakılamaz"}
                value={name}
                placeholder={"Ad giriniz"}
                viewStyle={{ marginTop: responsiveHeight(10) }}
                onChangeText={handleNameChange}
            />
            <CustomInput
                title="Soyad"
                error={!surnameValid}
                errorText={"Soyad alanı boş bırakılamaz"}
                value={surname}
                placeholder={"Soyad giriniz"}
                viewStyle={{ marginTop: responsiveHeight(10) }}
                onChangeText={handleSurnameChange}
            />
            <CustomButton
                disabled={(!(name.trim().length > 0 && surname.trim().length > 0) || (name === user?.name && surname === user?.surname))}
                onPress={handleUpdateNameSurname}
                size="large"
                style={{
                    position: "absolute",
                    width: responsiveWidth(335),
                    bottom: responsiveHeight(50),
                }}
            >Güncelle</CustomButton>
        </View >
    )
}
export default NameSurnameUpdateContent;