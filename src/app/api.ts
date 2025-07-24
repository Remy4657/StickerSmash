import axios from "axios";
import { IExercise } from "../types/type";
const APP_URL = "http://192.168.30.107:3000";

export const api = {
  getTodos: async (): Promise<IExercise[]> => {
    try {
      const res = await axios.get(`${APP_URL}/api/todos`);
      return res.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },
  addTodos: async (
    id_temp: string,
    newExerciseTitle: string,
    isDone: boolean
  ): Promise<IExercise> => {
    try {
      const res = await axios.post(`${APP_URL}/api/todos`, {
        id_temp,
        title: newExerciseTitle,
        isDone,
      });
      return res.data;
    } catch (error) {
      console.error("Error add todos:", error);
      throw error;
    }
  },

  // Cập nhật trạng thái bài tập
  updateTodos: async (
    _id: string,
    title: string,
    isDone: boolean
  ): Promise<any> => {
    try {
      const res = await axios.put(`${APP_URL}/api/todos/${_id}`, {
        title: title,
        isDone: isDone,
      });
      console.log("res: ", res);
      return res;
    } catch (error) {
      console.error("Error updating exercise status:", error);
      throw error;
    }
  },
  deleteTodos: async (_id: string): Promise<void> => {
    try {
      const res = await axios.delete(`${APP_URL}/api/todos/${_id}`);
      console.log("res delete: ", res);
      return;
    } catch (error) {
      console.error("Error delete todos:", error);
      throw error;
    }
  },
};
