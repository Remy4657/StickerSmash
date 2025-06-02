import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#ffff" }}>
        <Text style={{ fontSize: 30 }}>Sign in</Text>
      </View>
    </SafeAreaView>
  );
};
export default Login;
