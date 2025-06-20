import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ToastProvider } from "react-native-toast-notifications";

import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import { Text, View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ToastProvider
      placement="top"
      duration={15000}
      renderType={{
        error: (toast) => (
          <View
            style={{
              backgroundColor: "red",
              padding: 16,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auths)/login/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auths)/signup/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </ToastProvider>
  );
}
