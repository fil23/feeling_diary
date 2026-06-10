import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.testo}>Home screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testo: {
    color: "white",
  },
});
