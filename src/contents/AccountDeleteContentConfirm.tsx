import { Button } from "@ui-kitten/components";
import AlertDialog from "components/AlertDialog";
import CustomText from "components/CustomText";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import React from "react";
import { View } from "react-native";
interface Props {
    onDeletePress: () => void
}

const AccountDeleteContentConfirm = (props: Props) => {
    return (
        <View style={{ width: responsiveWidth(300), }} >
            <CustomText
                style={{
                    fontWeight: "700",
                    fontSize: 20,
                    marginBottom: 10,
                    textAlign: "center",
                    color: '#000000'
                }}
            >Emin misiniz?</CustomText>
            <CustomText
                style={{
                    textAlign: "center",
                    color: "#262625",
                    lineHeight: 20,
                    marginBottom: responsiveHeight(10),
                }}
            >Hesabınızı silmek istediğinizden emin misiniz?</CustomText>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: 'center',
                    paddingTop: 10,
                }}
            >
                <Button
                    appearance="outline"
                    onPress={() => AlertDialog.dismiss()}
                >Hayır</Button>
                <Button
                    onPress={props.onDeletePress}
                >Evet</Button>
            </View>
        </View>
    )
};
export default AccountDeleteContentConfirm;