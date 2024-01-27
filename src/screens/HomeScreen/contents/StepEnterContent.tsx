import React, { FC, useState } from "react"
import { Alert, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import AlertDialog from "components/AlertDialog";
import { API_EnterStep } from "API/API";
interface Props {
    onRefresh: () => void;
}
const StepEnterContent: FC<Props> = (props) => {
    const [step, setStep] = useState("");
    const onStepSend = () => {
        API_EnterStep(step).then((res) => {
            props.onRefresh();
            AlertDialog.dismiss();
        }).catch((err) => {
            Alert.alert("Hata Oluştu", err.message);
        })
    };
    return (
        <View
            style={{
                width: responsiveWidth(250),
            }}
        >
            <CustomText style={{
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600",
            }}
            >Adım Sayısı Gir</CustomText>
            <CustomInput
                value={step.toString()}
                title="Adım Sayısı"
                type="integer"
                placeholder="Adım Sayısı"
                viewStyle={{
                    marginTop: responsiveHeight(20),
                    marginBottom: responsiveHeight(20),
                }}
                maxLength={5}
                onChangeTextIntegerStr={setStep}
            />
            <CustomButton
                onPress={onStepSend}
                size="large"
                style={{
                    marginBottom: responsiveHeight(20),
                    width: responsiveWidth(200),
                    alignSelf: "center",

                }}

            >Ekle</CustomButton>
        </View>
    )
}
export default StepEnterContent;