import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  pass: string;
  setPass: (p: string) => void;
  hide: boolean;
  setHide: (h: boolean) => void;
  style?: StyleProp<ViewStyle>;
  text?: string;
}

export const CustomPasswordInput = (props: Props) => {
  const { theme } = useTheme();
  const styles = customStyle(theme);

  return (
    <View style={[styles.passwordContainer, props.style]}>
      <TextInput
        placeholder={props.text ?? "Password..."}
        textContentType="password"
        maxLength={25}
        cursorColor={theme.text}
        placeholderTextColor={theme.placeholder}
        style={[styles.input, { borderWidth: 0, width: "90%" }]}
        secureTextEntry={props.hide}
        value={props.pass}
        onChangeText={props.setPass}
        returnKeyType="done"
        className="password"
        id="password"
        autoComplete="password"
        disableFullscreenUI={true}
      />
      {/* TODO: Inserire icona all'interno del password input */}
      <Pressable onPress={() => props.setHide(!props.hide)}>
        <Ionicons
          name={props.hide ? "eye-off-outline" : "eye-outline"}
          size={25}
          color={theme.text}
        />
      </Pressable>
    </View>
  );
};

const customStyle = (theme: ThemeColor) =>
  StyleSheet.create({
    input: {
      borderWidth: 2,
      borderColor: theme.border,
      color: theme.text,
      height: 45,
      borderRadius: 10,
      paddingLeft: 5,
      fontFamily: "Pixelify-Regular",
      fontSize: 17,
      width: "100%",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.text,
      marginTop: "10%",
      borderRadius: 10,
      paddingRight: "2%",
    },
  });
