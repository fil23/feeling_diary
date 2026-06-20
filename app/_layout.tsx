import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/context/themeContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Pixelify-Regular": require("../assets/fonts/PixelifySans-Regular.ttf"),
    "Pixelify-Bold": require("../assets/fonts/PixelifySans-Bold.ttf"),
    Inter: require("../assets/fonts/Inter-VariableFont.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  //carico il font
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <KeyboardProvider>
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </AuthProvider>
    </KeyboardProvider>
  );
}
