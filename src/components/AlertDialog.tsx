/*
Author: Emre EKE
Date: 2023-04-20T18:20:17.734Z
*/

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView, TouchableHighlight, BackHandler } from 'react-native';
import Modal from 'react-native-modal';
import { SCREEN_HEIGHT, SCREEN_WIDTH, responsiveHeight, responsiveWidth } from 'constants/Dimension';
import CustomText from './CustomText';
import CloseImage from './CloseImage';
import SafeAreaSpace from './SafeAreaSpace';
interface Props {
}
interface State {
    isVisible?: boolean;
    content: React.ReactNode;
    titleLeftComp?: React.ReactNode;
    title?: string;
    height?: number
    mode?: "DEFAULT" | "CENTER" | "AUTO"
    onClose?: () => void
    safeArea?: boolean
    scrollEnabled?: boolean

}
class AlertDialog extends Component<Props, State> {
    static Instance: AlertDialog;
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisible: false,
            content: <></>,
        };
    }
    componentDidMount() { AlertDialog.Instance = this; }
    componentDidUpdate() { }
    componentWillUnmount() { }


    /**
  * Gösterilecek bildirim seçenekleri
  * content - İçerik bileşeni -> React.ReactNode
  * title - Başlık metni -> string
  * height - Maksimum yükseklik (SCREEN_HEIGHT*0.92) -> number
  * center - İçeriği ortalamak için -> boolen
  * onClose - Modal close function ()=>void
  */
    static show({
        content,
        title,
        height,
        mode,
        titleLeftComp,
        safeArea,
        onClose,
        scrollEnabled,
    }: State) {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
        AlertDialog.Instance.setState({
            isVisible: true,
            content,
            title,
            height,
            mode,
            safeArea,
            titleLeftComp,
            onClose,
            scrollEnabled,
        });
    }
    static dismiss() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
        AlertDialog.Instance.setState({ isVisible: false });
    }

    static handleBackButtonPress = () => {
        this.dismiss();
        return true;
    }

    render() {
        const { isVisible, content, title, height, mode, onClose, titleLeftComp, safeArea, scrollEnabled } = this.state;
        const Content = safeArea ? <>{content}<SafeAreaSpace type="BOTTOM" /></> : content
        return (
            <Modal
                animationIn={mode == "CENTER" ? "fadeIn" : undefined}
                animationOut={mode == "CENTER" ? "fadeOut" : undefined}
                isVisible={isVisible}
                style={[styles.modal, {
                    flexDirection: mode == "CENTER" ? undefined : 'row',
                    alignItems: mode == "CENTER" ? "center" : 'flex-end',
                    marginTop: mode == "CENTER" ? undefined : height ? SCREEN_HEIGHT - height : responsiveHeight(100),
                }]}
                swipeDirection="down"
                propagateSwipe
                swipeThreshold={50}
                backdropOpacity={0.4}
                customBackdrop={<TouchableWithoutFeedback
                    onPress={() => {
                        onClose && onClose()
                        AlertDialog.Instance.setState({ isVisible: false })
                    }}
                >
                    <View
                        style={{ backgroundColor: 'black', ...Dimensions.get('screen') }}
                    />
                </TouchableWithoutFeedback>
                }
                statusBarTranslucent
                coverScreen={false}
                onSwipeComplete={() => {
                    onClose && onClose()
                    AlertDialog.Instance.setState({ isVisible: false })
                }}
                onBackdropPress={() => {
                    onClose && onClose()
                    AlertDialog.Instance.setState({ isVisible: false })
                }}
                onBackButtonPress={() => {
                    onClose && onClose()
                    AlertDialog.Instance.setState({ isVisible: false })
                }}
            >

                {mode == "CENTER" ?
                    <View style={{ backgroundColor: "white", alignItems: "center", alignSelf: "center", borderRadius: 15, padding: 20 }}>
                        {content}
                    </View>
                    :
                    <View style={[styles.rootContainer]}>
                        <View style={mode == "AUTO" ? styles.containerAuto : styles.container}>
                            {title &&
                                <>
                                    <View style={styles.titleContainer}>
                                        <CustomText numberOfLines={1} style={styles.titleText}>{title}</CustomText>
                                        <TouchableOpacity
                                            onPress={() => {
                                                onClose && onClose()
                                                this.setState({ isVisible: false })
                                            }}
                                            style={styles.closeButton}
                                        >
                                            <CloseImage />
                                        </TouchableOpacity>
                                        {titleLeftComp &&
                                            <View style={{ position: "absolute", left: responsiveWidth(10), }}>
                                                {titleLeftComp}
                                            </View>
                                        }
                                    </View>
                                    {/* {Content} */}
                                </>
                            }
                            {scrollEnabled ?
                                <ScrollView>
                                    <TouchableHighlight>
                                        {Content}
                                    </TouchableHighlight>
                                </ScrollView>
                                :
                                Content
                            }

                        </View>
                    </View>
                }
            </Modal >
        );
    }
}

export default AlertDialog;
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
    },
    rootContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    container: {
        backgroundColor: 'white',
        width: '101%',
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    containerAuto: {
        backgroundColor: 'white',
        width: '101%',
        maxHeight: "95%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },

    titleContainer: {
        height: responsiveHeight(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    titleText: {
        color: "#000",
        fontSize: 20,
        width: responsiveWidth(375),
        textAlign: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: responsiveWidth(20)
    },
    image: {
        height: 20,
        width: 20
    },
});
