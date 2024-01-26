import React, { FC } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
    type: "BOTTOM" | "TOP"
    style?: StyleProp<ViewStyle>
}
const SafeAreaSpace: FC<Props> = (props) => {
    const insets = useSafeAreaInsets();
    return <View style={[{ height: props.type == "BOTTOM" ? insets.bottom : insets.top }, props.style]} />
}
export default SafeAreaSpace;