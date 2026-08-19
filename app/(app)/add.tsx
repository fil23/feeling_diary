import { CustomButtons } from "@/components/buttons/customButton";
import { useTheme } from "@/context/themeContext";
import { ThemeColor } from "@/types/themecolor";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  const { theme } = useTheme();
  const styles = customStyle(theme);
  const [vote, setVote] = useState<number>(5);

  useEffect(() => {
    console.log(vote);
  }, [vote]);

  return (
    <SafeAreaView style={styles.container}>
      //buttoms to vote
      <View style={styles.voteContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <Pressable
            key={index}
            onPress={() => setVote(index + 1)}
            style={styles.voteButton}
          >
            <Text style={styles.voteText}>{(index + 1).toString()}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.voteContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <Pressable
            key={index}
            onPress={() => setVote(index + 6)}
            style={styles.voteButton}
          >
            <Text style={styles.voteText}>{(index + 6).toString()}</Text>
          </Pressable>
        ))}
      </View>
      <View>
        <Text style={styles.subtitle}>What are you feeling now?</Text>
        <TextInput
          multiline={true}
          style={styles.areaText}
          numberOfLines={7}
          placeholder="Write everything you want..."
          placeholderTextColor={theme.placeholder}
          cursorColor={theme.text}
        />
      </View>
      <CustomButtons
        textButton="Save"
        onPressAction={() => console.log("save")}
        theme={theme}
        style={{ width: "40%" }}
      />
    </SafeAreaView>
  );
}

const customStyle = (theme: ThemeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 10,
    },
    subtitle: {
      color: theme.text,
      fontFamily: "Pixelify-Bold",
      fontSize: 25,
      marginBottom: 20,
    },
    voteContainer: {
      flexDirection: "row",
      marginHorizontal: "5%",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      marginBottom: "7%",
    },
    voteButton: {
      borderWidth: 2,
      borderColor: theme.border,
      minWidth: 55,
      padding: 10,
      borderRadius: 10,
    },
    voteText: {
      color: theme.text,
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Pixelify-Bold",
    },
    areaText: {
      borderWidth: 1,
      borderColor: theme.shadow,
      maxHeight: 200,
      minHeight: 100,
      color: theme.text,
      paddingHorizontal: 5,
      paddingVertical: 5,
      fontSize: 16,
      fontFamily: "SpaceMono",
    },
  });
