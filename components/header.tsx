import { useTheme } from "@/context/themeContext";
import { Stack } from "expo-router";

interface Props {
  t?: string;
  inroute?: string;
}

export const CustomHeader = (props: Props) => {
  const { theme } = useTheme();
  return (
    <Stack
      initialRouteName={props.inroute ?? undefined}
      screenOptions={{
        headerTitle: props.t,
        headerTitleStyle: {
          color: theme.text,
          fontFamily: "Pixelify-Bold",
          fontSize: 30,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}
    />
  );
};
