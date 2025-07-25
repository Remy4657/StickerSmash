import { api } from "@/app/api";
import { IExercise, UpdateExercisePayload } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useExercises = (id?: string) => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const { data: fetchedExercises } = useQuery<IExercise[]>({
    queryKey: ["exercises"],
    queryFn: () => api.getTodos(),
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
      const updatedList = [...(exercisesList || []), newExercise];
      updatedList.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return updatedList;
    });
  };
  const removeExerciseFromLocalList = (_id: string) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.filter((exercise) => exercise._id !== _id);
    });
  };

  const updateMutation = useMutation({
    scope: {
      id: "constant",
    },
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) => (
      console.log("[update] mutationFn payload: ", payload),
      api.updateTodos(payload._id, payload.title, payload.isDone)
    ),

    onSuccess(data) {
      updateLocalExerciseList(data.data._id, data.data.isDone, false);
    },
    onMutate: async (payload: UpdateExercisePayload) => {
      console.log("[update] onMutate payload: ", payload);
      await queryClient.cancelQueries(["exercises"] as any);
      updateLocalExerciseList(payload._id, payload.isDone, true);
    },
  });
  // Mutation để thêm todo mới
  const addMutation = useMutation({
    scope: {
      id: "constant",
    },
    mutationKey: ["exercises"],
    mutationFn: async (payload: any) => {
      console.log("[add mutationFn] payload: ", payload);
      return api.addTodos(payload._id, payload.title, false);
    },

    onSuccess(data: any, _variables: any, context: any) {
      console.log("[add onSuccess]");
      const tempId = context?.tempId;
      const realExercise = data;

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
        createdAt: new Date().toISOString(),
      };
      // Thêm vào danh sách local ngay lập tức
      addLocalExercise(tempExercise);
      return { tempId };
    },
    onSettled: () => {},
  });

  // Mutation để delete
  const deleteMutation = useMutation({
    scope: {
      //id: `update-ex + ${Math.random().toString(36).slice(2, 11)}`,

      id: "constant",
    },
    mutationKey: ["exercises"],
    mutationFn: async (payload: any) => api.deleteTodos(payload._id),
    onMutate: async (payload: any) => {
      await queryClient.cancelQueries(["exercises"] as any);
      removeExerciseFromLocalList(payload._id);
    },
  });
  return {
    exercises: fetchedExercises,
    addMutation,
    updateMutation,
    deleteMutation,
    isAdding,
  };
};
