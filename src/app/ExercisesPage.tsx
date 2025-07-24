import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Exercise from "./Exercise";
import { useExercises } from "@/components/ExercisesPage/useExercises";

const ExercisesPage = () => {
  const [newExerciseTitle, setNewExerciseTitle] = useState("");
  const { exercises, addMutation, updateMutation, deleteMutation, isAdding } =
    useExercises();

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Exercises</Text>
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên bài tập"
          value={newExerciseTitle}
          onChangeText={setNewExerciseTitle}
        />
        <Button
          title="Add"
          onPress={() => {
            //  const {
            //    exercises,
            //    addMutation,
            //    updateMutation,
            //    deleteMutation,
            //    isAdding,
            //  } = useExercises(exercise._id);
            addMutation.mutate({
              title: newExerciseTitle,
              _id: `temp-${Date.now()}`,
            });
            setNewExerciseTitle("");
          }}
        />
      </View>
      <ScrollView>
        {exercises?.map((exercise) => (
          <Exercise
            onButtonPress={() => {
              // const {
              //   exercises,
              //   addMutation,
              //   updateMutation,
              //   deleteMutation,
              //   isAdding,
              // } = useExercises(exercise._id);
              updateMutation.mutate({
                _id: exercise._id,
                title: exercise.title,
                isDone: !exercise.isDone,
              });
            }}
            onDeletePress={() => {
              // const {
              //   exercises,
              //   addMutation,
              //   updateMutation,
              //   deleteMutation,
              //   isAdding,
              // } = useExercises(exercise._id);
              deleteMutation.mutate({ _id: exercise._id });
            }}
            key={exercise._id}
            exercise={exercise}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "bold",
  },
  addContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

export default ExercisesPage;
