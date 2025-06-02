import ShareButton from "@/components/button/share.button";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#ffff" }}>
        <Text style={{ fontSize: 30 }}>Hello, welcome!</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <ShareButton
            title="Sign up"
            onPress={() => {
              router.navigate("/signup");
            }}
            textStyle={{ textTransform: "lowercase", fontSize: 20 }}
            pressStyle={{ alignSelf: "stretch" }}
            btnStyle={{
              justifyContent: "center",
              borderRadius: 50,
            }}
            icons={<AntDesign name="pluscircle" size={30} color="black" />}
          />
          <ShareButton
            title="Login"
            onPress={() => {
              router.navigate("/login");
            }}
            textStyle={{ textTransform: "lowercase", fontSize: 20 }}
            pressStyle={{ alignSelf: "stretch" }}
            btnStyle={{
              justifyContent: "center",
              borderRadius: 50,
            }}
            icons={<AntDesign name="pluscircle" size={30} color="black" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default WelcomePage;
