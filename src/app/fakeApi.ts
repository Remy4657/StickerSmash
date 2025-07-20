import axios from "axios";

export interface IExercise {
  _id: string;
  title: string;
  isNotSynced?: boolean;
  isDone: boolean;
}

export interface UpdateExercisePayload {
  _id: string;
  title: string;
  isDone: boolean;
}

let exercises: IExercise[] = [
  {
    _id: "1",
    title: "Push ups",
    isDone: true,
  },
  {
    _id: "2",
    title: "Pull ups",
    isDone: false,
  },
  {
    _id: "3",
    title: "Squats",
    isDone: false,
  },
  {
    _id: "4",
    title: "Lunges",
    isDone: false,
  },
  {
    _id: "5",
    title: "Bench press",
    isDone: false,
  },
];

export const fakeApi = {
  getTodos: async () =>
    new Promise<IExercise[]>((resolve) => {
      setTimeout(async () => {
        const res = await axios.get("http://localhost:3000/api/todos");
        console.log("res: ", res.data);
        resolve(res.data);
      }, 300);
    }),

  updateExerciseStatus: (_id: string, title: string, isDone: boolean) =>
    new Promise<any>((resolve) => {
      setTimeout(async () => {
        console.log("_id: ", _id);

        const res = await axios.put(`http://localhost:3000/api/todos/${_id}`, {
          title: title,
          isDone: isDone,
        });
        console.log("res: ", res.data);
        console.log("title: ", title);
        const exerciseToUpdate = exercises.find((t) => t._id == 2);

        if (exerciseToUpdate) {
          const updatedExercise = {
            ...exerciseToUpdate,
            isDone,
          };

          exercises = exercises.map((exercise) => {
            if (exercise._id === _id) {
              return updatedExercise;
            }
            return exercise;
          });
          console.log("updatedExercise: ", updatedExercise);
        }
        resolve(res);
      }, 300);
    }),
};
