import { LoginErrorAlert } from "@/components/alerts/loginAlerts";
import { CustomButtons } from "@/components/buttons/customButton";
import { CustomPasswordInput } from "@/components/inputs/customPasswordInputs";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { CircularProgressIndicator } from "@expo/ui/jetpack-compose";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { theme } = useTheme();
  const { err, login, loading, signInWithGoogle } = useAuth();
  const styles = customStyles(theme);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.main}>
      {/*Pop up nel caso ci sia un errore nella login */}
      {loading === true ? (
        <CircularProgressIndicator />
      ) : err ? (
        <LoginErrorAlert message={err} />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.cotainer}
          keyboardShouldPersistTaps="handled"
          bottomOffset={24}
        >
          <Text style={styles.title}>Welcome back!</Text>
          <TextInput
            placeholder="Email"
            textContentType="emailAddress"
            inputMode="email"
            maxLength={50}
            cursorColor={theme.text}
            placeholderTextColor={theme.placeholder}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="email"
            id="email"
            autoComplete="email"
            disableFullscreenUI={true}
          />

          <CustomPasswordInput
            pass={pass}
            setPass={setPass}
            hide={hide}
            setHide={setHide}
          />
          <CustomButtons
            theme={theme}
            textButton="Login"
            onPressAction={() => login(email, pass)}
            disabled={loading || (email === "" && pass === "")}
          />
          <Text style={styles.divider}>or</Text>
          <CustomButtons
            theme={theme}
            textButton="Continue with Google"
            onPressAction={signInWithGoogle}
            disabled={loading}
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
          <Link href="/(auth)/signin" style={styles.link}>
            Don't you have an account yet?
          </Link>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
}

const customStyles = (theme: ThemeColor) =>
  StyleSheet.create({
    cotainer: {
      // borderColor: theme.border,
      // borderWidth: 1,
      marginHorizontal: "5%",
      height: "75%",
    },
    main: {
      flex: 1,
      backgroundColor: theme.background,
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
      width: "100%",
    },

    link: {
      color: theme.text,
      fontFamily: "Pixelify-Regular",
      fontSize: 15,
      textAlign: "center",
    },

    divider: {
      color: theme.placeholder,
      fontFamily: "Pixelify-Regular",
      fontSize: 16,
      textAlign: "center",
      marginBottom: "2%",
    },

    googleButton: {
      backgroundColor: theme.background,
      borderColor: theme.border,
      borderWidth: 2,
      marginTop: 0,
    },

    googleButtonText: {
      color: theme.text,
    },
  });
