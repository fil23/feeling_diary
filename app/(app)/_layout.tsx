import CustomCircularProgress from "@/components/circular_progress_lading";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/hooks/useAuth";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Redirect, Tabs } from "expo-router";

export default function PrivateLayout() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return loading ? (
    <CustomCircularProgress />
  ) : (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.text,
          fontFamily: "Pixelify-Bold",
          fontSize: 30,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.backgroundTab,
          borderCurve: "continuous",
          height: 70,
          paddingTop: 7,
          borderTopWidth: 0,
        },
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: {
          fontFamily: "SpaceMono",
        },
      }}
    >
      <Tabs.Screen
        name="graphics"
        options={{
          title: "Graphics",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "podium" : "podium-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
