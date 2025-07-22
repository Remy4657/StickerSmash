import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IExercise } from "./fakeApi";
interface ExerciseProps {
  exercise: IExercise;
  onButtonPress: () => void;
  onDeletePress: () => void;
}

const Exercise = ({
  exercise,
  onButtonPress,
  onDeletePress,
}: ExerciseProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onButtonPress}
          style={[
            styles.button,
            {
              backgroundColor: exercise.isDone ? "#4caf50" : "#e0e0e0",
            },
          ]}
        >
          <AntDesign
            name="check"
            size={24}
            color={exercise.isDone ? "#fff" : "#000"}
          />
        </TouchableOpacity>

        <Text style={styles.text}>
          {exercise.title} - {exercise?.isNotSynced ? "not synced" : "synced"}
        </Text>
      </View>

      <TouchableOpacity onPress={onDeletePress}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 4,
    marginTop: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default Exercise;
