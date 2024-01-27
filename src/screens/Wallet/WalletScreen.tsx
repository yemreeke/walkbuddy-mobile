import React, { FC, useEffect, useState } from "react"
import { Alert, StyleSheet, Touchable, TouchableOpacity, View } from "react-native"
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { Card, Icon } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import { useAppSelector } from "store/Hooks";
import { API_GetCurrentStep } from "API/API";
import { Colors } from "constants/Colors";
import { SCREENS } from "navigation/Navigation";
interface Props {
    navigation: NavigationProp<any, any>
}
const WalletScreen: FC<Props> = (props) => {
    const { user } = useAppSelector((state) => state.auth);
    const [coin, setCoin] = useState(0);
    const GetSteps = () => {
        API_GetCurrentStep().then((res) => {
            setCoin(res.data.coin_count);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Adım Sayısı Alınamadı");
        })

    };

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && GetSteps();
    }, [isFocused]);
    return (
        <SafeAreaView edges={["top"]} style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <CustomHeader title="Cüzdan" />

            <Card
                status="warning"
                style={{
                    marginTop: responsiveHeight(20),
                    marginHorizontal: responsiveWidth(20),
                }}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Icon name="credit-card-outline" height={responsiveWidth(50)} width={responsiveWidth(50)} fill={Colors["color-warning-500"]} />
                    <View style={{ marginLeft: responsiveWidth(15) }}>
                        <CustomText style={styles.text}>{`Ad : ${user?.name}`}</CustomText>
                        <CustomText style={styles.text}>{`Soyad : ${user?.surname}`}</CustomText>
                        <CustomText style={styles.text}>{`Kullanılabilir Coin : ${coin}`}</CustomText>
                        <CustomText style={styles.text}>{`TL Karşılığı : ${coin / 100} TL`}</CustomText>
                    </View>
                </View>
            </Card>

            <View
                style={{
                    marginHorizontal: responsiveWidth(20),

                }}
            >
                <Card style={{ marginTop: responsiveHeight(20) }} onPress={() => props.navigation.navigate(SCREENS.IbanTransferScreen)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="corner-up-right-outline" height={responsiveWidth(30)} width={responsiveWidth(30)} fill="black" />
                        <CustomText style={styles.buttonText}>IBAN Adresime Transfer Et</CustomText>
                    </View>
                </Card>
                <Card style={{ marginTop: responsiveHeight(20) }} onPress={() => props.navigation.navigate(SCREENS.PastIbanTransfers)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="list-outline" height={responsiveWidth(30)} width={responsiveWidth(30)} fill="black" />
                        <CustomText style={styles.buttonText}>Geçmiş IBAN Transferler</CustomText>
                    </View>
                </Card>

                <Card style={{ marginTop: responsiveHeight(20) }} onPress={() => props.navigation.navigate(SCREENS.PastMarketOrders)}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="shopping-cart-outline" height={responsiveWidth(30)} width={responsiveWidth(30)} fill="black" />

                        <CustomText style={styles.buttonText}>Geçmiş Market Siparişleri</CustomText>
                    </View>
                </Card>

            </View>
        </SafeAreaView>
    )
}
export default WalletScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: responsiveHeight(2),
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: responsiveHeight(2),
        marginLeft: responsiveWidth(10)
    }
})