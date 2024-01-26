import { Dimensions } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
export const responsiveWidth = (value: number) => Dimensions.get("window").width / (375 / value)
export const responsiveHeight = (value: number) => Dimensions.get("window").height / (812 / value)