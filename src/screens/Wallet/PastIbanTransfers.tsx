import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList, StyleSheet, View } from "react-native"
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { Card, Icon } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import { API_GetCurrentStep, API_GetIbanTransfers, API_IBANTransfer } from "API/API";
import { Colors } from "constants/Colors";
import CustomInput from "components/CustomInput";
import CustomButton from "components/CustomButton";
import { ILastIbanTransfer } from "interfaces/Wallet";
import moment from "moment";
interface Props {
    navigation: NavigationProp<any, any>
}
const PastIbanTransfers: FC<Props> = (props) => {
    const [transfers, setTransfers] = useState<ILastIbanTransfer[]>([]);
    const GetLastIbanTransfers = () => {
        API_GetIbanTransfers().then((res) => {
            setTransfers(res.data);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Transferler Alınamadı");
        })
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && GetLastIbanTransfers();
    }, [isFocused]);

    return (
        <SafeAreaView edges={["top"]} style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <CustomHeader goBack title="Geçmiş IBAN Transferleri" />

            <FlatList

                data={transfers}
                style={{ flex: 1 }}
                ListFooterComponent={() => <View style={{ height: 200 }} />}
                renderItem={({ item }) => {
                    return (
                        <Card
                            status="success"
                            style={{
                                marginTop: responsiveHeight(20),
                                marginHorizontal: responsiveWidth(20),
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Icon name="credit-card-outline" height={responsiveWidth(50)} width={responsiveWidth(50)} fill={Colors["color-success-500"]} />
                                <View style={{
                                    marginLeft: responsiveWidth(15),
                                    width: responsiveWidth(220)
                                }}>
                                    <CustomText style={styles.text}>{`Tutar : ${item.tl_price} TL`}</CustomText>
                                    <CustomText style={styles.text}>{`Tarih : ${moment(item.created_at).format("MM/DD/YYYY HH:mm:ss")}`}</CustomText>
                                    <CustomText style={styles.text}>{`IBAN : ${item.iban_no}`}</CustomText>
                                </View>
                            </View>
                        </Card>

                    )
                }}
            />

        </SafeAreaView>
    )
}
export default PastIbanTransfers;

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