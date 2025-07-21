// import ShareButton from "@/components/button/share.button";
// import ShareInput from "@/components/input/share.input";
// import { useRouter } from "expo-router";
// import { Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AntDesign } from "@expo/vector-icons";

// const Signup = () => {
//   const router = useRouter();
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ backgroundColor: "#ffff", flex: 1 }}>
//         <Text style={{ fontSize: 30 }}>Sign up</Text>
//         <View style={{ flex: 1 }}>
//           <View>
//             <ShareButton
//               title="Sign up"
//               onPress={() => {
//                 router.navigate("/signup");
//               }}
//               textStyle={{ textTransform: "lowercase", fontSize: 20 }}
//               pressStyle={{ alignSelf: "stretch" }}
//               btnStyle={{
//                 justifyContent: "center",
//                 borderRadius: 50,
//               }}
//               icons={<AntDesign name="pluscircle" size={30} color="black" />}
//             />
//             <ShareInput placeholder="name" />
//           </View>
//           <View style={{}}>
//             <ShareInput placeholder="age" />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default Signup;

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as zod from "zod";

/**import component */
import { login } from "@/api/api";
import { Toast } from "react-native-toast-notifications";
const authSchema = zod
  .object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: zod.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Auth() {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = async (data: zod.infer<typeof authSchema>) => {
    try {
      console.log(process.env.EXPO_PUBLIC_BASE_URL);
      const res = await login({
        username: data.email,
        password: data.password,
      });

      console.log("res: ", res);
      if (res.EC == 0) {
        Toast.show("Invalid username or password", {
          type: "error",
        });
      } else {
        Toast.show("Signed in successfully", {
          type: "success",
        });
        router.navigate("/(tabs)");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please Authenticate to continue</Text>

        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Password"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(signUp)}
          disabled={formState.isSubmitting}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("/")}>
          <Text style={{ color: "#fff", textDecorationLine: "underline" }}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 32,
  },
  input: {
    width: "90%",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "90%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
  },
  signUpButtonText: {
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "left",
    width: "90%",
  },
});
