import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { StyleSheet, Text, View } from "react-native";

export const LoginErrorAlert = () => {
  const { err } = useAuth();
  const { theme } = useTheme();
  const styles = customstyle(theme);

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.title}>Error:</Text>
      <Text style={styles.errorText}>{err}</Text>
    </View>
  );
};

const customstyle = (theme: ThemeColor) =>
  StyleSheet.create({
    errorContainer: {
      width: "95%",
      marginHorizontal: "2.5%",
      maxHeight: "20%",
      backgroundColor: theme.error,
      borderRadius: 10,
      position: "absolute",
      top: 0,
      alignItems: "center",
    },
    title: {
      color: theme.text,
      fontFamily: "Pixelify-Bold",
      fontSize: 25,
    },
    errorText: {
      color: theme.text,
      fontFamily: "Inter",
      fontSize: 15,
      marginVertical: "2%",
    },
  });
