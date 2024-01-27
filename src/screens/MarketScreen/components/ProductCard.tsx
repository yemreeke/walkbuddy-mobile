import AlertDialog from "components/AlertDialog"
import CustomText from "components/CustomText"
import { responsiveWidth } from "constants/Dimension"
import { IProduct } from "interfaces/Market"
import React, { FC } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import ProductBuyContent from "../contents/ProductBuyContent"
interface Props {
    product: IProduct
    onBuy: (order_number: number) => void
}
const ProductCard: FC<Props> = ({ product, onBuy }) => {

    const onDetail = () => {
        AlertDialog.show({
            content: <ProductBuyContent onBuy={onBuy} product={product} />,
            mode: "CENTER",
        })
    }


    return (
        <TouchableOpacity
            onPress={onDetail}
            style={{
                height: responsiveWidth(150),
                width: responsiveWidth(150),
                borderWidth: 1,
                borderColor: '#CCC',
                borderRadius: 10,
                marginHorizontal: responsiveWidth(50 / 4),
                marginVertical: responsiveWidth(50 / 4),
                justifyContent: "space-between",
                paddingBottom: responsiveWidth(10),
            }}
        >
            <Image
                resizeMode="contain"
                source={{ uri: product.image_url }}
                style={{
                    height: responsiveWidth(80),
                    width: responsiveWidth(148),
                }}
            />
            <CustomText style={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}>{product.name}</CustomText>
            <CustomText style={{ textAlign: "center", fontWeight: "400", fontSize: 14, marginHorizontal: responsiveWidth(10) }}>{product.description}</CustomText>
        </TouchableOpacity>
    )
}
export default ProductCard;