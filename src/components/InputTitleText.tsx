import React, { FC } from "react"
import { StyleProp, TextStyle } from "react-native"
import CustomText from "./CustomText"
import { responsiveHeight, responsiveWidth } from "constants/Dimension"
interface Props {
    title: string
    style?: StyleProp<TextStyle>
}
const InputTitleText: FC<Props> = (props) => {
    return (
        <CustomText
            style={[{
                color: "#000",
                fontSize: 16,
                marginBottom: responsiveHeight(5),
                marginLeft: responsiveWidth(5)
            }, props.style]}>{props.title}</CustomText>
    )
}
export default InputTitleText;