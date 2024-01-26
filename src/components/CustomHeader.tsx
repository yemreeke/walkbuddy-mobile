import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { Icon } from "@ui-kitten/components";
import CustomText from "./CustomText";
interface Props {
    goBack?: boolean
    title?: string
}
const CustomHeader: FC<Props> = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            {props.goBack &&
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 2,
                        left: responsiveWidth(3),
                        position: "absolute",
                    }}
                >
                    <Icon
                        fill="black"
                        style={{
                            height: responsiveHeight(45),
                            width: responsiveWidth(45),
                        }}
                        name='arrow-ios-back-outline'
                    />
                </TouchableOpacity>
            }
            <View
                style={{
                    height: responsiveHeight(50),
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CustomText style={{ fontSize: 20 }}>{props.title ? props.title : "Başlık"}</CustomText>
            </View>
        </View>
    )
}
export default CustomHeader;