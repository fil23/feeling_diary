import { ThemeColor } from "@/types/themecolor";
import { Pressable, StyleProp, StyleSheet, Text } from "react-native";
import {
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  theme: ThemeColor;
  textButton: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const CustomButtons = (props: Props) => {
  const styles = customStyles(props.theme);
  return (
    <Pressable style={[styles.buttonContainer, props.style]}>
      <Text style={[props.textStyle, styles.buttonText]}>
        {props.textButton}
      </Text>
    </Pressable>
  );
};

const customStyles = (theme: ThemeColor) =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.primary,
      height: 30,
      width: "50%",
      justifyContent: "center",
      borderRadius: 30,
      alignItems: "center",
      alignSelf: "center",
      marginVertical: "7%",
      padding: 3,
    },

    buttonText: {
      fontFamily: "Pixelify-Bold",
      fontSize: 18,
    },
  });
