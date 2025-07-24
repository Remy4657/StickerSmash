import axios from "axios";

export interface IExercise {
  _id: string;
  id_temp: string;
  title: string;
  isDone: boolean;
}

export interface UpdateExercisePayload {
  _id: string;
  title: string;
  isDone: boolean;
}

export const fakeApi = {
  getTodos: async (): Promise<IExercise[]> => {
    try {
      const res = await axios.get("http://192.168.30.107:3000/api/todos");
      return res.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  },
  addTodos: async (
    id_temp: string,
    newExerciseTitle: string,
    isDone: boolean
  ): Promise<IExercise> => {
    try {
      const res = await axios.post("http://192.168.30.107:3000/api/todos", {
        id_temp,
        title: newExerciseTitle,
        isDone,
      });
      return res.data;
    } catch (error) {
      console.error("Error add todos:", error);
      return error as IExercise;
    }
  },

  // Cập nhật trạng thái bài tập
  updateExerciseStatus: async (
    _id: string,
    title: string,
    isDone: boolean
  ): Promise<any> => {
    try {
      const res = await axios.put(
        `http://192.168.30.107:3000/api/todos/${_id}`,
        {
          title: title,
          isDone: isDone,
        }
      );
      return res;
    } catch (error) {
      console.error("Error updating exercise status:", error);
      return;
    }
  },
  deleteTodos: async (_id: string): Promise<void> => {
    try {
      const res = await axios.delete(
        `http://192.168.30.107:3000/api/todos/${_id}`
      );
      console.log("res delete: ", res);
      return;
    } catch (error) {
      console.error("Error delete todos:", error);
      return;
    }
  },
};
