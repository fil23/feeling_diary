import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import { CircularProgressIndicator, Host } from "@expo/ui/jetpack-compose";
import { StyleSheet, View } from "react-native";

export const CustomCircularProgress = () => {
  const { theme } = useTheme();
  const styles = customStyle(theme);

  return (
    <View style={styles.container}>
      <Host matchContents>
        <CircularProgressIndicator />
      </Host>
    </View>
  );
};

const customStyle = (theme: ThemeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
