import { responsiveHeight } from "constants/Dimension";
import React, { FC } from "react"
import { Image, ImageStyle, StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { Images } from "resources/Images";
interface Props {
    style?: StyleProp<ImageStyle>
    touchable?: boolean
    onPress?: () => void
    touchableStyle?: StyleProp<ViewStyle>
}
const CloseImage: FC<Props> = (props) => {
    const { style, touchable, onPress, touchableStyle } = props
    return (
        <>
            {touchable ?
                <TouchableOpacity
                    style={[{ height: responsiveHeight(20), width: responsiveHeight(20) }, touchableStyle]}
                    onPress={onPress}
                >
                    <Image
                        source={Images.Close}
                        style={[{ height: responsiveHeight(20), width: responsiveHeight(20) }, style]}
                    />
                </TouchableOpacity>
                :
                <Image
                    source={Images.Close}
                    style={[{ height: responsiveHeight(20), width: responsiveHeight(20) }, style]}
                />
            }
        </>
    )
}
export default CloseImage;