import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  const { user, logout } = useAuth();

  useEffect(() => {
    console.table(user);
    // logout();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.testo}>Home screen</Text>
    </SafeAreaView>
  );
}

const customStyles = (theme: ThemeColor) =>
  StyleSheet.create({
    testo: {
      color: theme.text,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
