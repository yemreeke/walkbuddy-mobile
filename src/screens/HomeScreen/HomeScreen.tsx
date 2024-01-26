import CustomText from "components/CustomText";
import React, { FC } from "react"
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "store/Hooks";
interface Props {
}
const HomeScreen: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CustomText
                    style={{
                        fontSize: 20,
                        marginHorizontal: 20,
                    }}
                >{"User -> " + JSON.stringify(user)}</CustomText>
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen;