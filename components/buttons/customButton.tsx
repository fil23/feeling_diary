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
  disabled?: boolean;
}

export const CustomButtons = (props: Props) => {
  const styles = customStyles(props.theme);
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        props.style,
        props.disabled && styles.disable,
      ]}
      onPress={props.onPressAction}
      disabled={props.disabled === null ? false : props.disabled}
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
      width: "100%",
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

    disable: {
      opacity: 0.5,
      backgroundColor: theme.placeholder,
    },
  });
