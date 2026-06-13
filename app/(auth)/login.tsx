import { CustomButtons } from "@/components/buttons/customButton";
import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.cotainer}>
        <Text style={styles.title}>Welcome back!</Text>
        <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          maxLength={25}
          cursorColor={theme.text}
          placeholderTextColor={theme.text}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            textContentType="password"
            maxLength={25}
            cursorColor={theme.text}
            placeholderTextColor={theme.text}
            style={[styles.input, { borderWidth: 0, width: "90%" }]}
            secureTextEntry={hide}
            value={pass}
            onChangeText={setPass}
          />
          //TODO: Inserire icona all'interno del password input
          <Pressable onPress={() => setHide(!hide)}>
            <Ionicons
              name={hide ? "eye-off-outline" : "eye-outline"}
              size={30}
              color={theme.text}
            />
          </Pressable>
        </View>

        <CustomButtons theme={theme} textButton="Login" />
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
      fontFamily: "Pixelify-Regular",
      fontSize: 45,
      textAlign: "center",
      marginVertical: "10%",
      textShadowColor: theme.shadow,
      textShadowOffset: {
        height: 2,
        width: 1,
      },
    },
    input: {
      borderWidth: 2,
      borderColor: theme.border,
      color: theme.text,
      height: 40,
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
      height: 40,
      marginVertical: "10%",
      borderRadius: 10,
      paddingRight: "2%",
    },
    link: {
      color: theme.text,
      fontFamily: "Pixelify-Regular",
      fontSize: 15,
      textAlign: "center",
    },
  });
