import ShareInput from "@/components/input/share.input";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#ffff", flex: 1 }}>
        <Text style={{ fontSize: 30 }}>Sign up</Text>
        <View style={{ flex: 1 }}>
          <View>
            <ShareInput placeholder="name" />
          </View>
          <View style={{}}>
            <ShareInput placeholder="age" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Signup;
