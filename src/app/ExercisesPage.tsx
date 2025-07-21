import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Exercise from "./Exercise";
import { fakeApi, IExercise, UpdateExercisePayload } from "./fakeApi";

const ExercisesPage = () => {
  const [newExerciseTitle, setNewExerciseTitle] = useState("");
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
  console.log("fetchedExercises: ", fetchedExercises);
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
  // Hàm thêm bài tập vào danh sách local
  const addLocalExercise = (newExercise: IExercise) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return [...(exercisesList || []), newExercise];
    });
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) =>
      fakeApi.updateExerciseStatus(payload._id, payload.title, payload.isDone),

    onSuccess(data) {
      console.log("data: ", data);
      updateLocalExerciseList(data.data._id, data.data.isDone, false);
    },
    onMutate: async (payload: UpdateExercisePayload) => {
      await queryClient.cancelQueries(["exercises"]);
      updateLocalExerciseList(payload._id, payload.isDone, true);
    },
  });
  interface payloadAdd {
    newExerciseTitle: string;
  }
  // Mutation để thêm todo mới
  const addMutation = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: any) => (
      console.log("payload mutationFn: ", payload),
      fakeApi.addTodos(payload.title, false)
    ),

    onSuccess(data: any) {
      console.log("onSuccess data", data);
      // Khi thêm thành công trên server, cập nhật isNotSynced = false
      queryClient.setQueryData<any[]>(["exercises"], (exercisesList) => {
        return exercisesList?.map((exercise) => {
          // if (exercise._id === data._id) {
          return { ...exercise, isNotSynced: false };
          // }
          //return exercise;
        });
      });
    },
    onMutate: async (payload: any) => {
      console.log("onMutate payload: ", payload);
      await queryClient.cancelQueries(["exercises"]);
      // Tạo bài tập tạm thời với isNotSynced = true
      const tempExercise: any = {
        //_id: payload._id,
        title: payload.title,
        isDone: false,
        isNotSynced: true,
      };

      // Thêm vào danh sách local ngay lập tức
      addLocalExercise(tempExercise);

      // // Trả về exercise tạm thời để rollback nếu có lỗi
      // return { tempExercise };
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Exercises</Text>
      {/* Phần thêm bài tập mới */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên bài tập"
          value={newExerciseTitle}
          onChangeText={setNewExerciseTitle}
        />
        <Button
          title="Add"
          onPress={() =>
            addMutation.mutate({
              title: newExerciseTitle,
              _id: Math.random().toString(36).substring(2, 9),
            })
          }
        />
      </View>
      <ScrollView>
        {fetchedExercises?.map((exercise) => (
          <Exercise
            onButtonPress={() =>
              updateMutation.mutate({
                _id: exercise._id,
                title: exercise.title,
                isDone: !exercise.isDone,
              })
            }
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
