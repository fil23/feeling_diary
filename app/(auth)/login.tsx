import { LoginErrorAlert } from "@/components/alerts/loginAlerts";
import { CustomButtons } from "@/components/buttons/customButton";
import { CustomPasswordInput } from "@/components/inputs/customPasswordInputs";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { theme } = useTheme();
  const { err, login } = useAuth();
  const styles = customStyles(theme);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.main}>
      {/*Pop up nel caso ci sia un errore nella login */}

      {err ? <LoginErrorAlert /> : null}
      <View style={styles.cotainer}>
        <Text style={styles.title}>Welcome back!</Text>
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          inputMode="email"
          maxLength={50}
          cursorColor={theme.text}
          placeholderTextColor={theme.text}
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
        />
        <Link href="/(auth)/signin" style={styles.link}>
          Don't you have an account yet?
        </Link>
      </View>
    </SafeAreaView>
  );
}

const customStyles = (theme: ThemeColor) =>
  StyleSheet.create({
    cotainer: {
      // borderColor: theme.border,
      // borderWidth: 1,
      width: "80%",
      height: "75%",
      justifyContent: "center",
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
  });
