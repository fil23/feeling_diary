import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import { Host, ProgressView, Text } from "@expo/ui/swift-ui";
import { StyleSheet, View } from "react-native";

export default function CustomCircularProgress() {
  const { theme } = useTheme();
  const styles = customStyle(theme);

  return (
    <View style={styles.container}>
      <Host matchContents>
        <ProgressView>
          <Text>Loading...</Text>
        </ProgressView>
      </Host>
    </View>
  );
}

const customStyle = (theme: ThemeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
