
import React, { FC } from "react"
import { FlatList, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "./components/ProductCard";
import { IProduct } from "interfaces/Market";
import CustomHeader from "components/CustomHeader";
interface Props {
    navigation: NavigationProp<any, any>
}
const MarketScreen: FC<Props> = (props) => {
    const products: IProduct[] = [
        {
            name: "Trendyol",
            description: "100 TL Hediye Çeki 10000 coin",
            coin: 10000,
            image_url: "https://logowik.com/content/uploads/images/trendyolcom2977.jpg"
        },
        {
            name: "Trendyol",
            description: "200 TL Hediye Çeki 20000 coin",
            coin: 20000,
            image_url: "https://logowik.com/content/uploads/images/trendyolcom2977.jpg"
        },

        {
            name: "Trendyol",
            description: "10 TL Hediye Çeki 1000 coin",
            coin: 1000,
            image_url: "https://logowik.com/content/uploads/images/trendyolcom2977.jpg"
        },

        {
            name: "Trendyol",
            description: "50 TL Hediye Çeki 5000 coin",
            coin: 5000,
            image_url: "https://logowik.com/content/uploads/images/trendyolcom2977.jpg"
        },

    ]
    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Hediye Çekleri" />
            <View style={{ flex: 1, alignItems: "center" }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={products}
                    numColumns={2}
                    renderItem={({ item, index }) => <ProductCard key={index} product={item} />}
                />
            </View>
        </SafeAreaView>
    )
}
export default MarketScreen;