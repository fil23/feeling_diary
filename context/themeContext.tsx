import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import type { ThemeColor } from "../types/themecolor";

type ThemeContextType = {
  colorScheme: "light" | "dark";
  theme: ThemeColor;
  toggleTheme: () => void;
  setColorScheme: (scheme: "light" | "dark") => void;
};

interface Props {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: Props) => {
  const systemScheme = useColorScheme();
  const [colorScheme, setColorSchemeState] = useState<"light" | "dark">(
    systemScheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    if (systemScheme) {
      setColorSchemeState(systemScheme === "dark" ? "dark" : "light");
    }
  }, [systemScheme]);

  const setColorScheme = (scheme: "light" | "dark") => {
    setColorSchemeState(scheme);
  };

  const toggleTheme = () => {
    setColorSchemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = Colors[colorScheme];

  return (
    <ThemeContext.Provider
      value={{ colorScheme, theme, toggleTheme, setColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
