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
  onPressAction: () => void;
}

export const CustomButtons = (props: Props) => {
  const styles = customStyles(props.theme);
  return (
    <Pressable
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPressAction}
    >
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
      width: "50%",
      justifyContent: "center",
      borderRadius: 30,
      alignItems: "center",
      alignSelf: "center",
      marginVertical: "7%",
      paddingVertical: "2%",
    },

    buttonText: {
      fontFamily: "Pixelify-Bold",
      fontSize: 20,
    },
  });
