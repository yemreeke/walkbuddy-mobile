import React, { FC } from "react"
import { Button, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import CustomText from "components/CustomText";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomButton from "components/CustomButton";
import AlertDialog from "components/AlertDialog";
import { IProduct } from "interfaces/Market";
interface Props {
    onBuy: () => void
    product: IProduct

}
const ProductBuyContent: FC<Props> = ({ onBuy, product }) => {
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
            >Hediye Çeki</CustomText>
            <CustomText
                style={{
                    textAlign: "center",
                    color: "#262625",
                    lineHeight: 20,
                    marginBottom: responsiveHeight(10),
                }}
            >{`${product.coin} Coin karşılığında bu hediye çekini almak istediğinizden emin misiniz ?`}</CustomText>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: 'center',
                    paddingTop: 10,
                }}
            >
                <CustomButton
                    appearance="outline"
                    onPress={() => AlertDialog.dismiss()}
                >Hayır</CustomButton>
                <CustomButton
                    onPress={onBuy}
                >Evet</CustomButton>
            </View>
        </View>
    )
}
export default ProductBuyContent;