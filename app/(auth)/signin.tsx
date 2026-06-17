import { CustomPasswordInput } from "@/components/inputs/customPasswordInputs";
import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HidePass {
  hidePass: boolean;
  hideConfPass: boolean;
}

export default function SignInScreen() {
  const { theme } = useTheme();
  const styles = customStyle(theme);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPass, setConfPass] = useState<string>("");
  const [hide, setHide] = useState<HidePass>({
    hidePass: false,
    hideConfPass: false,
  });

  const handleHidePass = () => {
    setHide((prev) => ({ ...prev, hidePass: !hide.hidePass }));
  };

  const handleHideConfPass = () => {
    setHide((prev) => ({ ...prev, hideConfPass: !hide.hideConfPass }));
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to{"\n"}Alone</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          cursorColor={theme.text}
          inputMode="email"
          style={styles.input}
          placeholderTextColor={theme.text}
        />
        <CustomPasswordInput
          pass={password}
          setPass={setPassword}
          hide={hide.hidePass}
          setHide={handleHidePass}
          style={styles.input}
        />
      </View>
    </SafeAreaView>
  );
}

const customStyle = (theme: ThemeColor) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme.background,
      flex: 1,

      alignItems: "center",
    },

    title: {
      color: theme.text,
      fontFamily: "Pixelify-Bold",
      fontSize: 45,
      textAlign: "center",
      marginVertical: "10%",
    },

    input: {
      borderWidth: 2,
      borderColor: theme.border,
      color: theme.text,
      height: 45,
      borderRadius: 10,
      paddingLeft: 5,
      fontFamily: "Pixelify-Regular",
      fontSize: 20,
      width: "90%",
      alignSelf: "center",
    },

    container: {
      borderColor: "white",
      borderWidth: 3,
      width: "90%",
      maxHeight: "90%",
      minHeight: "60%",
    },
  });
