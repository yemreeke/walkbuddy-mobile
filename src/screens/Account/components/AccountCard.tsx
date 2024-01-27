import { Card, Icon } from "@ui-kitten/components";
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
        <Card
            onPress={onPress}
            style={{
                marginTop: responsiveHeight(10),
                marginHorizontal: responsiveWidth(20)
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <View style={{ width: responsiveWidth(30) }}>
                    <Icon name={icon} height={responsiveWidth(30)} width={responsiveWidth(30)} fill="black" />
                </View>
                <CustomText
                    style={{
                        marginLeft: responsiveWidth(20),
                        width: responsiveWidth(290),
                        fontSize: 18,
                    }}>{text}</CustomText>
            </View>

        </Card>
    )
}
export default AccountCard;