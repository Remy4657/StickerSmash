import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
interface IProps {
  placeholder?: string;
}
const ShareInput = (props: IProps) => {
  const { placeholder } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={[styles.input, { borderColor: isFocused ? "green" : "red" }]}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ShareInput;
