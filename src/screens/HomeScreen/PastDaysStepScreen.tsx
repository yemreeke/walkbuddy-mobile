import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { API_GetLastDaySteps } from "API/API";
import { ILastStepItem } from "interfaces/Steps";
import CustomText from "components/CustomText";
import { Card, StyleService } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import moment from "moment";
import { TARGET_STEPS } from "constants/Constants";
interface Props {
    navigation: NavigationProp<any, any>
}
const PastDaysStepScreen: FC<Props> = (props) => {

    const [steps, setSteps] = useState<ILastStepItem[]>([]);
    const GetDatas = () => {
        API_GetLastDaySteps().then((res) => {
            setSteps(res.data);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Geçmiş Adımlar Alınamadı");
        })
    };

    useEffect(() => {
        GetDatas()
    }, []);
    return (
        <SafeAreaView
            edges={["top"]}
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <CustomHeader goBack title="Geçmiş Günlere Ait Adımlar" />
            <FlatList
                data={steps}
                renderItem={({ item }) => {
                    return (
                        <Card
                            status="primary"
                            style={{
                                marginVertical: responsiveWidth(10),
                                marginHorizontal: responsiveWidth(20),
                            }}
                        >
                            <CustomText style={styles.text}>{`Tarih : ${moment(item.created_at).format("DD/MM/YYYY")}`}</CustomText>
                            <CustomText style={styles.text}>{`Adım Sayısı : ${item.step_count}`}</CustomText>
                            <CustomText style={styles.text}>{`Tamamlama Yüzdesi : ${Math.round(item.step_count / TARGET_STEPS * 100)}%`}</CustomText>
                            <CustomText style={styles.text}>{`TL Karşılığı : ${(item.step_count / 100)} TL`}</CustomText>
                        </Card>
                    )
                }}
            />
        </SafeAreaView>
    )
}
export default PastDaysStepScreen;
const styles = StyleService.create({
    text: {
        marginTop: responsiveHeight(2),
        fontSize: 16,
        fontWeight: "600"
    }
})