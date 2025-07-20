import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Exercise from "./Exercise";
import { fakeApi, IExercise, UpdateExercisePayload } from "./fakeApi";
const ExercisesPage = () => {
  const checkAsyncStorage = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
      console.log(
        "Tất cả dữ liệu trong AsyncStorage:",
        JSON.parse(allData[0][1])
      );
    } catch (error) {
      console.error("Lỗi khi kiểm tra AsyncStorage:", error);
    }
  };
  const { data: fetchedExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fakeApi.getTodos(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const updateLocalExerciseList = (
    _id: string,
    isDone: boolean,
    isNotSynced?: boolean
  ) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.map((exercise) => {
        if (exercise._id === _id) {
          return {
            ...exercise,
            isDone,
            isNotSynced,
          };
        }
        return exercise;
      });
    });
  };

  const queryClient = useQueryClient();

  const updateExercise = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) => (
      console.log("hi"),
      fakeApi.updateExerciseStatus(payload._id, payload.title, payload.isDone)
    ),

    onSuccess(data) {
      //checkAsyncStorage();
      console.log("aa");
      Alert.alert(
        "on success" // Tiêu đề của alert
      );
      console.log("data: ", data);
      updateLocalExerciseList(data.data._id, data.data.isDone, false);
    },
    onMutate: async (payload: UpdateExercisePayload) => {
      console.log("bb");

      Alert.alert(
        "on mutate" // Tiêu đề của alert
      );

      await queryClient.cancelQueries(["exercises"]);
      updateLocalExerciseList(payload._id, payload.isDone, true);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Exercises</Text>
      {fetchedExercises?.map((exercise) => (
        <Exercise
          onButtonPress={() =>
            updateExercise.mutate({
              _id: exercise._id,
              title: exercise.title,
              isDone: !exercise.isDone,
            })
          }
          key={exercise._id}
          exercise={exercise}
        />
      ))}
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
});

export default ExercisesPage;
