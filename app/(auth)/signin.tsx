import { CustomButtons } from "@/components/buttons/customButton";
import { CustomPasswordInput } from "@/components/inputs/customPasswordInputs";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { CircularProgressIndicator } from "@expo/ui/jetpack-compose";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

interface HidePass {
  hidePass: boolean;
  hideConfPass: boolean;
}

export default function SignInScreen() {
  const { theme } = useTheme();
  const styles = customStyle(theme);
  const { signIn, loading } = useAuth();
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
      {loading === true ? (
        <CircularProgressIndicator />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          bottomOffset={24}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome to{"\n"}Alone</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            cursorColor={theme.text}
            inputMode="email"
            style={styles.input}
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={setEmail}
          />
          <CustomPasswordInput
            pass={password}
            setPass={setPassword}
            hide={hide.hidePass}
            setHide={handleHidePass}
            style={styles.input}
          />

          <CustomPasswordInput
            pass={confPass}
            setPass={setConfPass}
            hide={hide.hideConfPass}
            setHide={handleHideConfPass}
            style={styles.input}
            text="Confirm password..."
          />

          <CustomButtons
            textButton="Sign in"
            onPressAction={() => signIn(email, password)}
            theme={theme}
            style={{ width: "90%" }}
            disabled={
              !loading && (!email || !password || password !== confPass)
            }
          />
        </KeyboardAwareScrollView>
      )}
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
      fontSize: 17,
      width: "100%",
      alignSelf: "center",
    },

    container: {
      marginHorizontal: "5%",
    },
  });
