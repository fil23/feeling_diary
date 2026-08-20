import { saveComment, saveMood } from "@/api/feelings_api";
import { CustomButtons } from "@/components/buttons/customButton";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { ThemeColor } from "@/types/themecolor";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Add() {
  const { theme } = useTheme();
  const styles = customStyle(theme);
  const { user, setLoading, setErr } = useAuth();
  const [vote, setVote] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const saveVote = () => {
    setLoading(true);

    saveMood(vote, user?.id!)
      .then((idMood) => {
        if (comment != "") saveComment(idMood, comment, user?.id!);
      })
      .catch((error) => {
        console.error(error);
        setErr(error.message());
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* //buttoms to vote */}
      {/* FIXME: change buttoms with slider */}

      <Text style={styles.subtitle}>
        How much happy are you in this moment?
      </Text>
      <View style={styles.voteContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <Pressable
            key={index}
            onPress={() => setVote(index + 1)}
            style={[
              styles.voteButton,
              vote == index + 1
                ? { backgroundColor: theme.placeholder }
                : { backgroundColor: theme.background },
            ]}
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
            style={[
              styles.voteButton,
              vote == index + 6
                ? { backgroundColor: theme.placeholder }
                : { backgroundColor: theme.background },
            ]}
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
          onChangeText={setComment}
        />
      </View>
      <CustomButtons
        textButton="Save"
        onPressAction={saveVote}
        theme={theme}
        style={{ width: "40%" }}
      />
    </KeyboardAwareScrollView>
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
