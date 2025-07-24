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
import { IExercise, UpdateExercisePayload, fakeApi } from "./fakeApi";

const ExercisesPage = () => {
  const queryClient = useQueryClient();

  const [newExerciseTitle, setNewExerciseTitle] = useState("");

  const { data: fetchedExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fakeApi.getTodos(),
    staleTime: Infinity,
    cacheTime: Infinity,
  } as any);
  useEffect(() => {
    if (fetchedExercises) {
      //console.log("fetchedExercises: ", fetchedExercises);
    }
  }, [fetchedExercises]);
  const updateLocalExerciseList = (
    _id: string,
    isDone: boolean,
    isNotSynced?: boolean
  ) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.map((exercise) => {
        if (exercise._id === _id || exercise.id_temp === _id) {
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
  const removeExerciseFromLocalList = (_id: string) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.filter((exercise) => exercise._id !== _id);
    });
  };

  const updateMutation = useMutation({
    scope: {
      //id: `update-ex + ${Math.random().toString(36).slice(2, 11)}`,
      id: "2",
    },
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) => (
      console.log("[update] mutationFn payload: ", payload),
      fakeApi.updateExerciseStatus(payload._id, payload.title, payload.isDone)
    ),

    onSuccess(data) {
      console.log("[update] onSuccess data: ", data.data);
      updateLocalExerciseList(data.data._id, data.data.isDone, false);
    },
    onMutate: async (payload: UpdateExercisePayload) => {
      console.log("[update] onMutate payload: ", payload);
      await queryClient.cancelQueries(["exercises"] as any);
      updateLocalExerciseList(payload._id, payload.isDone, true);
    },
  });
  interface payloadAdd {
    newExerciseTitle: string;
  }
  // Mutation để thêm todo mới
  const addMutation = useMutation({
    scope: {
      //id: `update-ex + ${Math.random().toString(36).slice(2, 11)}`,
      id: "2",
    },
    mutationKey: ["exercises"],
    mutationFn: async (payload: any) => {
      console.log("[add mutationFn] payload: ", payload);

      return fakeApi.addTodos(payload._id, payload.title, false);
    },

    onSuccess(data: any, _variables: any, context: any) {
      console.log("[add onSuccess]");
      const tempId = context?.tempId;
      const realExercise = data;
      //console.log("tempId: ", tempId);
      //console.log("realExercise: ", realExercise);
      // Khi thêm thành công trên server, cập nhật isNotSynced = false
      queryClient.setQueryData<any[]>(["exercises"], (exercisesList) => {
        return exercisesList?.map((exercise) => {
          if (exercise._id === tempId) {
            return { ...realExercise, isNotSynced: false };
          }
          return exercise;
        });
      });
      queryClient.refetchQueries(["exercises"] as any);
    },
    onMutate: async (payload: any) => {
      console.log("[add onMutate]");

      await queryClient.cancelQueries(["exercises"] as any);
      const tempId = `temp-${Date.now()}`; // tạo id tạm
      const tempExercise: any = {
        _id: payload._id,
        title: payload.title,
        isDone: false,
        isNotSynced: true,
      };
      // Thêm vào danh sách local ngay lập tức
      addLocalExercise(tempExercise);
      return { tempId };
    },
    onSettled: () => {},
  });

  // Mutation để delete
  const deleteMutation = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: any) => fakeApi.deleteTodos(payload._id),
    onMutate: async (payload: any) => {
      await queryClient.cancelQueries(["exercises"] as any);
      removeExerciseFromLocalList(payload._id);
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
          onPress={() => {
            addMutation.mutate({
              title: newExerciseTitle,
              _id: `temp-${Date.now()}`,
            });
            setNewExerciseTitle("");
          }}
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
            onDeletePress={() => deleteMutation.mutate({ _id: exercise._id })}
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
