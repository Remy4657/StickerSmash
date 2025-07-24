// import { useQueryClient } from "@tanstack/react-query";
// import { IExercise } from "../../types/type";

// const queryClient = useQueryClient();

// // update exercise to local
// export const updateLocalExercise = (
//   _id: string,
//   isDone: boolean,
//   isNotSynced?: boolean
// ) => {
//   const queryClient = useQueryClient();

//   queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
//     return exercisesList?.map((exercise) => {
//       if (exercise._id === _id || exercise.id_temp === _id) {
//         return {
//           ...exercise,
//           isDone,
//           isNotSynced,
//         };
//       }
//       return exercise;
//     });
//   });
// };
// // add exercise to local
// export const addLocalExercise = (newExercise: IExercise) => {
//   queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
//     return [...(exercisesList || []), newExercise];
//   });
// };
// // remove exercise to local

// export const removeLocalExercise = (_id: string) => {
//   queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
//     return exercisesList?.filter((exercise) => exercise._id !== _id);
//   });
// };
