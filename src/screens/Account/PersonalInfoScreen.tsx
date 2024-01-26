import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import AlertDialog from "components/AlertDialog";
import { Icon, StyleService } from "@ui-kitten/components";
import NameSurnameUpdateContent from "./contents/NameSurnameUpdateContent";
import { useAppSelector } from "store/Hooks";
import EmailUpdateContent from "./contents/EmailUpdateContent";
import IbanUpdateContent from "./contents/IbanUpdateContent";
interface Props {
    navigation: NavigationProp<any, any>
}
const AccountInfoScreen: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const showUpdateNameSurname = () => {
        AlertDialog.show({
            content: <NameSurnameUpdateContent />,
            mode: "DEFAULT",
            title: "Ad Soyad Güncelle"
        })
    };
    const showUpdateEmail = () => {
        AlertDialog.show({
            content: <EmailUpdateContent />,
            mode: "DEFAULT",
            title: "E-Posta Güncelle"
        })
    };
    const showUpdateIban = () => {
        AlertDialog.show({
            content: <IbanUpdateContent />,
            mode: "DEFAULT",
            title: "IBAN Güncelle"
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Kişisel Bilgiler" goBack />
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: responsiveWidth(20), marginTop: responsiveHeight(10) }}>
                    <View style={{
                        flexDirection: "row",
                        height: responsiveHeight(50),
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: responsiveHeight(10),
                        borderBottomWidth: 1,
                        borderBottomColor: "#CCC",
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="person-outline" height={responsiveHeight(30)} width={responsiveHeight(30)} fill="black" />
                            <View style={styles.textContainer}>
                                <CustomText style={styles.title}>Ad Soyad</CustomText>
                                <CustomText style={styles.valueText}>{`${user?.name} ${user?.surname}`}</CustomText>
                            </View>
                        </View>
                        <TouchableOpacity onPress={showUpdateNameSurname}>
                            <CustomText style={{ color: "#FF5106", textAlign: "right", fontWeight: "600", fontSize: 16 }}>Güncelle</CustomText>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        height: responsiveHeight(50),
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: responsiveHeight(10),
                        borderBottomWidth: 1,
                        borderBottomColor: "#CCC",
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="email-outline" height={responsiveHeight(30)} width={responsiveHeight(30)} fill="black" />
                            <View style={styles.textContainer}>
                                <CustomText style={styles.title}>{"E-posta"}</CustomText>
                                <CustomText style={styles.valueText}>{user?.email}</CustomText>
                            </View>
                        </View>
                        <TouchableOpacity onPress={showUpdateEmail}>
                            <CustomText style={{ color: "#FF5106", textAlign: "right", fontWeight: "600", fontSize: 16 }}>Güncelle</CustomText>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        height: responsiveHeight(50),
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: responsiveHeight(10),
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="people-outline" height={responsiveHeight(30)} width={responsiveHeight(30)} fill="black" />
                            <View style={styles.textContainer}>
                                <CustomText style={styles.title}>IBAN</CustomText>
                                <CustomText style={styles.valueText}>{user?.iban_no}</CustomText>
                            </View>
                        </View>
                        <TouchableOpacity onPress={showUpdateIban}>
                            <CustomText style={{ color: "#FF5106", textAlign: "right", fontWeight: "600", fontSize: 16 }}>Güncelle</CustomText>
                        </TouchableOpacity>
                    </View>
                </View >
            </View>
        </SafeAreaView>
    )

}
export default AccountInfoScreen;

const styles = StyleService.create({
    title: {
        color: "gray",
        fontSize: 13
    },
    valueText: {
        fontWeight: "700",
        fontSize: 15
    },
    textContainer: {
        marginLeft: responsiveWidth(10),
        width: responsiveWidth(210),
        justifyContent: "center"
    },

})