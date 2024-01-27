import React, { FC, useEffect, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { Card, Icon } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import { API_GetCurrentStep, API_IBANTransfer } from "API/API";
import { Colors } from "constants/Colors";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
interface Props {
    navigation: NavigationProp<any, any>
}
const IbanTransferScreen: FC<Props> = (props) => {
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
    const [transferedCoin, setTransfered] = useState("");

    const onTransfer = () => {
        const transferedCoinInt = parseInt(transferedCoin);
        if ((transferedCoinInt) > coin) {
            Alert.alert("Hata Oluştu", "Yetersiz Coin");
            return;
        }
        API_IBANTransfer(transferedCoinInt).then((res) => {
            props.navigation.goBack();
            Alert.alert("Başarılı", "Transfer İşlemi Başarılı");
        }).catch((err) => {
            Alert.alert("Hata Oluştu", err.message);
        })

    };
    return (
        <SafeAreaView edges={["top"]} style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <CustomHeader goBack title="IBAN Transfer" />
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
                <CustomInput
                    title="Tutar (Coin)"
                    type="integer"
                    viewStyle={{ marginTop: responsiveHeight(20) }}
                    placeholder="Tutar (Coin)"
                    onChangeTextIntegerStr={setTransfered}
                    value={transferedCoin}
                />
                {transferedCoin != "" && <CustomText
                    style={{
                        marginTop: responsiveHeight(10),
                        fontSize: 18,
                        fontWeight: "600",

                    }}
                >{`   ${transferedCoin} Coin karşılığında hesabına ${parseInt(transferedCoin) / 100} TL aktarılacaktır.`}</CustomText>}
                <CustomButton
                    onPress={onTransfer}
                    disabled={transferedCoin == "" || transferedCoin == "0" || parseInt(transferedCoin) == 0}
                    size="large"
                    style={{
                        marginTop: responsiveHeight(20),
                    }}
                >Transfer Et</CustomButton>
            </View>
        </SafeAreaView>
    )
}
export default IbanTransferScreen;

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