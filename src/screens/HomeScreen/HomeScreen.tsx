import { Card, Icon } from "@ui-kitten/components";
import AlertDialog from "components/AlertDialog";
import CustomButton from "components/CustomButton";
import CustomText from "components/CustomText";
import { Colors } from "constants/Colors";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import React, { FC, useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress, CircularProgress } from "react-native-circular-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle } from "react-native-svg";
import { useAppSelector } from "store/Hooks";
import StepEnterContent from "./contents/StepEnterContent";
import { TARGET_STEPS } from "constants/Constants";
import { API_GetCurrentStep, API_GetSevenDayStatistic } from "API/API";
import { NavigationProp, useIsFocused } from "@react-navigation/native";
import API from "API/Instance";
import { SCREENS } from "navigation/Navigation";
interface Props {
    navigation: NavigationProp<any, any>,
}
const HomeScreen: FC<Props> = (props) => {
    const { token } = useAppSelector((state) => state.auth);

    const [steps, setSteps] = useState(0);
    const [coin, setCoin] = useState(0);
    const [lastSevenDays, setLastSevenDays] = useState<{ dayOfWeek: string, count: number }[]>([]);
    const GetSteps = () => {
        API_GetCurrentStep().then((res) => {
            setSteps(res.data.step_count);
            setCoin(res.data.coin_count);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "Adım Sayısı Alınamadı");
        })

    };
    const GetLastSevenDayStatistic = () => {
        API_GetSevenDayStatistic().then((res) => {
            setLastSevenDays(res.data);
        }).catch((err) => {
            Alert.alert("Hata Oluştu", "İstatistik Alınamadı");
        })

    };
    const isFocused = useIsFocused();


    const GetDatas = () => {
        API.setAuthorizationHeader(token);
        GetSteps();
        GetLastSevenDayStatistic();
    };

    useEffect(() => {
        isFocused && GetDatas()
    }, [isFocused]);


    const showStep = () => {
        AlertDialog.show({
            content: <StepEnterContent onRefresh={GetDatas} />,
            mode: "CENTER",
        })
    };

    const onOldSteps = () => {
        props.navigation.navigate(SCREENS.PastDaysStepScreen);
    };
    const progress = (steps / TARGET_STEPS) * 100;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: responsiveHeight(50),
                }}
            >
                <CircularProgress
                    size={responsiveWidth(250)}
                    width={responsiveWidth(25)}
                    fill={progress}
                    tintColor="#0661F6"
                    backgroundColor="#3d5875"
                    rotation={-135}
                    lineCap="round"
                    arcSweepAngle={270}
                >
                    {() => (
                        <View style={styles.innerContainer}>
                            <Text style={styles.progressText}>{Math.floor(progress)}%</Text>
                            <Text style={styles.statusText}>{steps} / {TARGET_STEPS} Adım</Text>
                        </View>
                    )}
                </CircularProgress>
                <Card
                    disabled
                    status="warning"
                    style={{
                        width: responsiveWidth(330),
                    }}
                >
                    <CustomText style={{
                        fontSize: 20,
                        textAlign: "center",
                    }}>{`Coin Miktarı : ${coin}`}</CustomText>
                </Card>
                <CustomButton
                    disabled={steps == TARGET_STEPS}
                    onPress={showStep}
                    style={{ marginTop: responsiveHeight(30) }}
                    size="large"
                >Adım Sayısı Gir</CustomButton>
                <Card
                    disabled
                    status="success"
                    style={{
                        marginTop: responsiveHeight(40),
                        width: responsiveWidth(330),
                    }}
                >
                    <CustomText style={styles.text}>Günlük Hedefleriniz</CustomText>
                    <CustomText style={styles.desc}>Son Yedi Gün</CustomText>
                    <View
                        style={{
                            marginTop: responsiveHeight(10),
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }}
                    >

                        {
                            lastSevenDays.map((item, index) => (
                                <View
                                    key={index}
                                >

                                    <CircularProgress
                                        size={responsiveWidth(35)}
                                        width={responsiveWidth(5)}
                                        fill={(item.count / TARGET_STEPS) * 100}
                                        tintColor={Colors["color-success-500"]}
                                        backgroundColor="#3d5875"
                                        rotation={0}
                                        lineCap="round"
                                    >
                                        {() => (
                                            <>
                                                {item.count == TARGET_STEPS &&
                                                    <Icon name="award-outline" height={responsiveWidth(25)} width={responsiveWidth(25)} fill={Colors["color-success-500"]} />
                                                }
                                            </>
                                        )}
                                    </CircularProgress>
                                    <CustomText style={{ textAlign: "center", fontSize: 12, fontWeight: "500", marginTop: responsiveHeight(3) }} >{item.dayOfWeek}</CustomText>
                                </View>

                            ))
                        }


                    </View>

                </Card>
                <CustomButton
                    onPress={onOldSteps}
                    style={{
                        marginTop: responsiveHeight(20),
                    }}>Geçmiş Günlere Ait Adımlar</CustomButton>

            </View>
        </SafeAreaView>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 30,
        color: Colors["color-primary-500"],
        fontWeight: "bold"

    },
    statusText: {
        fontSize: 16,
        color: '#3d5875',
        marginTop: 5,
    },
    text: {
        fontSize: 18,
        color: "black"
    },
    desc: {
        fontSize: 16,
        color: "gray"
    }

});
