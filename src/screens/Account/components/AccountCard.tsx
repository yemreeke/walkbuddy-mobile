import { Icon } from "@ui-kitten/components";
import CustomText from "components/CustomText";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
type Props = {
    text: string
    onPress?: () => void
    icon: string
}
const AccountCard: FC<Props> = (props) => {
    const { text, onPress, icon } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: responsiveHeight(60),
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: responsiveWidth(375),
                flexDirection: "row",
                paddingHorizontal: responsiveWidth(20),
            }}>
            <View style={{ width: responsiveWidth(30) }}>
                <Icon name={icon} height={responsiveWidth(30)} width={responsiveWidth(30)} fill="black" />
            </View>
            <CustomText
                style={{
                    marginLeft: responsiveWidth(20),
                    width: responsiveWidth(290),
                    fontSize: 18,
                }}>{text}</CustomText>

        </TouchableOpacity>
    )
}
export default AccountCard;