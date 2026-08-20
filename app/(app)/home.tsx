import { LoginErrorAlert } from "@/components/alerts/loginAlerts";
import CustomCircularProgress from "@/components/circular_progress_lading";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import { useGraph } from "@/hooks/useGraph";
import { Comment, DataMood } from "@/types/moods";
import { ThemeColor } from "@/types/themecolor";
import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

interface GraphData {
  value: number;
  label: string;
  find: number;
}

export default function Home() {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  const { user, logout } = useAuth();
  const {
    error,
    getTodayMoods,
    loading,
    todayMoods,
    getTodayComments,
    todayComments,
  } = useGraph();

  const todayData: GraphData[] = [];
  useEffect(() => {
    const loadMoods = async () => {
      if (!user?.id) return;
      await getTodayMoods(user.id);
    };

    const loadComments = async () => {
      if (!user?.id) return;
      await getTodayComments(user.id);
    };

    loadMoods();
    loadComments();
    handleToday;

    console.log(todayData);
  }, []);

  const handleToday = useMemo(() => {
    if (!todayMoods) return;
    let tot = 0;
    todayMoods.map((item: DataMood) => {
      const value = item.mood_vote;
      const date = new Date(item.created_at);
      let l = date.getHours().toString().concat(":00");
      const ex = todayData.find((data) => data.label === l);
      if (ex) {
        ex.find++;
        tot += value;
        ex.value = Math.floor(tot / ex.find);
      } else {
        todayData.push({ value, label: l, find: 1 });
        tot = value;
      }
    });
  }, [, todayMoods]);

  if (loading) {
    return <CustomCircularProgress />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {error != null && <LoginErrorAlert message={error} />}
      <ScrollView style={{ gap: 30 }}>
        <View style={styles.today}>
          <Text style={styles.subtitle}>Mood of the day</Text>
          <BarChart
            data={todayData}
            xAxisColor={theme.text}
            yAxisColor={theme.text}
            frontColor={theme.text}
            trimYAxisAtTop
            adjustToWidth={true}
            allowFontScaling={true}
            color={theme.text}
            yAxisTextStyle={{
              color: theme.text,
              fontFamily: "SpaceMono",
            }}
            xAxisLabelTextStyle={{
              color: theme.text,
              fontFamily: "SpaceMono",
            }}
          />
        </View>
        <View style={styles.today}>
          <Text style={styles.subtitle}> Comments of the day </Text>

          {todayComments.map((comment: Comment, i: number) => {
            if (comment.comment != "") {
              const d = new Date(comment.created_at);
              return (
                <View key={i} style={styles.commentContainer}>
                  <Text style={styles.subcomment}>{d.toLocaleString()}</Text>
                  <Text style={styles.comment}>{comment.comment}</Text>
                </View>
              );
            }
          })}
        </View>
        {/* action button */}
        {/* <FloatingAction onPressMain={() => console.log("presse")} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const customStyles = (theme: ThemeColor) =>
  StyleSheet.create({
    subtitle: {
      color: theme.text,
      fontFamily: "Pixelify-Bold",
      fontSize: 30,
      marginBottom: 20,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      gap: "10%",
    },
    today: {
      width: "100%",
      marginBottom: "10%",
      marginRight: 20,
      marginLeft: 10,
    },
    commentContainer: {
      marginLeft: 10,
      paddingBottom: 10,
    },
    subcomment: {
      color: theme.shadow,
      fontFamily: "SpaceMono",
    },
    comment: {
      color: theme.text,
      fontFamily: "SpaceMono",
    },
  });
