import { Icon, IconElement, Input, InputProps } from "@ui-kitten/components";
import React, { FC, ReactElement, useState } from "react"
import { Platform, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import InputTitleText from "./InputTitleText";
import CustomText from "./CustomText";

type Props = InputProps & {
    error?: boolean;
    errorText?: string;
    title?: string;
    viewStyle?: ViewStyle;
    onChangeTextUpperCase?: (value: string) => void;
    personIcon?: boolean;
    type?: "text" | "integer" | "float" | "password";
    onChangeTextFloatStr?: (value: string) => void;
    onChangeTextIntegerStr?: (value: string) => void;
};

const CustomInput: FC<Props> = (props) => {
    const { error, errorText, title, viewStyle, personIcon, type, onChangeTextFloatStr, onChangeTextIntegerStr } = props;
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const renderPasswordIcon = (props: any): ReactElement => (
        <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );
    const PersonIcon = (style: any): IconElement => (
        <Icon {...style} name='person' />
    );
    return (
        <View style={viewStyle}>
            {title && <InputTitleText title={title} />}
            {type == "integer" ?
                <Input
                    autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
                    size="large"
                    accessoryRight={personIcon ? PersonIcon : undefined}
                    keyboardType={"numeric"}
                    onChangeText={(text: string) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        onChangeTextIntegerStr?.(numericValue);
                    }}
                    status={error ? "danger" : (props.value && props.value?.length > 0) ? "success" : "basic"}
                    {...props}
                />
                :
                type == "float" ?
                    <Input
                        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
                        size="large"
                        accessoryRight={personIcon ? PersonIcon : undefined}
                        keyboardType={"numeric"}
                        onChangeText={(text: string) => {
                            const numericValue = text.replace(/[^0-9]/g, '');
                            const parts = numericValue.split('.');
                            if (parts.length > 2) {
                                const integerPart = parts[0];
                                const decimalPart = parts.slice(1).join('');
                                const formattedValue = integerPart + '.' + decimalPart;
                                onChangeTextFloatStr?.(formattedValue);
                            } else if (text[0] != ".") {
                                onChangeTextFloatStr?.(numericValue);
                            }
                        }}
                        status={error ? "danger" : (props.value && props.value?.length > 0) ? "success" : "basic"}
                        {...props}
                    />
                    :
                    type == "password"
                        ?
                        <Input
                            autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
                            size="large"
                            secureTextEntry={secureTextEntry}
                            accessoryRight={renderPasswordIcon}
                            status={error ? "danger" : (props.value && props.value?.length > 0) ? "success" : "basic"}
                            {...props}
                        />
                        :
                        <Input
                            size="large"
                            autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
                            accessoryRight={personIcon ? PersonIcon : undefined}
                            onChangeText={(text: string) => {
                                props.onChangeTextUpperCase && props.onChangeTextUpperCase(text.toLocaleUpperCase("TR"));
                            }}
                            keyboardType={Platform.OS !== 'ios' && props.onChangeTextUpperCase ? "visible-password" : undefined}
                            secureTextEntry={Platform.OS !== 'ios' && props.onChangeTextUpperCase ? true : false}
                            passwordRules={""}
                            status={error ? "danger" : (props.value && props.value?.length > 0) ? "success" : "basic"}
                            {...props}
                        />
            }
            {(errorText && error) &&
                <CustomText style={{ color: "red" }}>{errorText}</CustomText>
            }
        </View>
    )
}
export default CustomInput;