import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList, Image, StyleSheet, View } from "react-native"
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { Card, Icon } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "components/CustomText";
import { API_GetMarketOrders } from "API/API";
import { Colors } from "constants/Colors";
import moment from "moment";
import { IPastOrderItem } from "interfaces/Market";
interface Props {
    navigation: NavigationProp<any, any>
}
const PastMarketOrders: FC<Props> = (props) => {
    const [orders, setOrders] = useState<IPastOrderItem[]>([]);
    const GetLastIbanTransfers = () => {
        API_GetMarketOrders().then((res) => {
            console.log(res.data);
            setOrders(res.data);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Transferler Alınamadı");
        })
    };

    useEffect(() => {
        GetLastIbanTransfers();
    }, []);

    return (
        <SafeAreaView edges={["top"]} style={{
            flex: 1,
            backgroundColor: "white",
        }}>
            <CustomHeader goBack title="Geçmiş Market Siparişleri" />
            <FlatList
                key={"market"}
                data={orders}
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
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: item.product.image_url }}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "gray",
                                        height: responsiveWidth(50),
                                        width: responsiveWidth(50),
                                    }}
                                />
                                <View style={{
                                    marginLeft: responsiveWidth(15),
                                    width: responsiveWidth(220),
                                }}>
                                    <CustomText style={styles.text}>{`Marka : ${item.product.name} `}</CustomText>
                                    <CustomText style={styles.text}>{`Ürün : ${item.product.description}`}</CustomText>
                                    <CustomText style={styles.text}>{`Tutar (Coin) : ${item.product.coin} `}</CustomText>
                                    <CustomText style={styles.text}>{`Kod : ${item.discount_coupon}`}</CustomText>
                                    <CustomText style={styles.text}>{`Tarih : ${moment(item.created_at).format("MM/DD/YYYY HH:mm:ss")}`}</CustomText>
                                </View>
                            </View>
                        </Card>

                    )
                }}
            />

        </SafeAreaView>
    )
}
export default PastMarketOrders;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: responsiveHeight(2),
    },
    textCenter: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: responsiveHeight(2),
        textAlign: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: responsiveHeight(2),
        marginLeft: responsiveWidth(10)
    }
})