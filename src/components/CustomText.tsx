import React, { FC } from "react"
import { Text, TextProps } from "react-native"
interface Props extends TextProps {
}
const CustomText: FC<Props> = (props) => {
    return (
        <Text
            {...props}
            style={[{
                color: "#000",
            }, props.style]}
        >
            {props.children}
        </Text>
    )
}
export default CustomText;