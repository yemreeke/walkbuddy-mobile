import React, { FC } from "react"
import { View } from "react-native"
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import CustomButton from "components/CustomButton";
import { Colors } from "constants/Colors";
import AlertDialog from "components/AlertDialog";
interface Props {
    code: string
}
const BuySuccesCodeContent: FC<Props> = ({ code }) => {
    return (
        <View
            style={{
                width: responsiveWidth(300),
            }}
        >
            <CustomText style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Hediye Çeki Alımı Başarılı</CustomText>
            <CustomText style={{ marginTop: responsiveHeight(10), fontSize: 16, }}>{"   Hediye çeki başarıyla alınmıştır. Aşağıda kodunuz gözükmektedir. Cüzdan kısmından da ulaşabilirsiniz."}</CustomText>
            <CustomText style={{ textAlign: "center", fontSize: 30, fontWeight: "700", marginVertical: responsiveHeight(10), color: Colors["color-warning-500"], letterSpacing: 3 }}>{code}</CustomText>
            <CustomButton
                onPress={() => AlertDialog.dismiss()}
                style={{ marginHorizontal: responsiveWidth(20) }}
            >Kapat</CustomButton>
        </View>
    )
}
export default BuySuccesCodeContent;