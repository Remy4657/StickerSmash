import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

/**  component */

export default function HomeScreen() {
  return (
    <View>
      <ThemedText>ABOUT!</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  text_white: {
    color: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
