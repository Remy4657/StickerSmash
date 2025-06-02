import { APP_COLOR } from "@/utils/constant";
import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    // alignSelf: "flex-start",
    backgroundColor: APP_COLOR.ORANGE,
  },
  text: {
    textTransform: "uppercase",
  },
});
interface IProps {
  title: string;
  onPress: () => void;

  textStyle?: StyleProp<TextStyle>;
  pressStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  icons?: ReactNode;
}
const ShareButton = (props: IProps) => {
  const { title, onPress, textStyle, pressStyle, btnStyle, icons } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed === true ? 0.5 : 1,
          alignSelf: "flex-start", // fit-content
        },
        pressStyle,
      ]}
      onPress={onPress}
    >
      <View style={[styles.btnContainer, btnStyle]}>
        {icons}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};
export default ShareButton;
