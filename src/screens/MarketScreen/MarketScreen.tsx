
import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList, View } from "react-native"
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "./components/ProductCard";
import { IProduct } from "interfaces/Market";
import CustomHeader from "components/CustomHeader";
import { API_CreateOrder, API_GetProducts } from "API/API";
import AlertDialog from "components/AlertDialog";
import BuySuccesCodeContent from "./contents/BuySuccesCodeContent";
import { Button } from "@ui-kitten/components";
interface Props {
    navigation: NavigationProp<any, any>
}
const MarketScreen: FC<Props> = (props) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    const GetProducts = () => {
        API_GetProducts().then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Ürünler getirilirken bir hata oluştu");
        })
    };

    const isFocused = useIsFocused()
    useEffect(() => {
        isFocused && GetProducts();
    }, [isFocused]);

    const onBuy = (order_id: number) => {
        API_CreateOrder(order_id).then((res) => {
            AlertDialog.show({
                content: <BuySuccesCodeContent code={res.data.discount_coupon} />,
                mode: "CENTER"
            })

        }).catch((err) => {
            AlertDialog.dismiss();
            Alert.alert("Hata Oluştu", err.message);
        })
    };

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Hediye Çekleri" />
            <View style={{ flex: 1, alignItems: "center" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={products}
                    numColumns={2}
                    renderItem={({ item, index }) => <ProductCard key={index} product={item} onBuy={onBuy} />}
                />
            </View>
        </SafeAreaView>
    )
}
export default MarketScreen;