import { useTheme } from "@/context/themeContext";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text style={{ color: theme.text }}>Login screen</Text>
    </SafeAreaView>
  );
}
