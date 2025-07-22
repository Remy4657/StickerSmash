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
  // Lấy tất cả bài tập
  getTodos: async (): Promise<IExercise[]> => {
    try {
      const res = await axios.get("http://192.168.30.107:3000/api/todos");
      return res.data; // Trả về dữ liệu bài tập
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // Ném lỗi nếu không lấy được dữ liệu
    }
  },
  addTodos: async (
    newExerciseTitle: string,
    isDone: boolean
  ): Promise<IExercise[]> => {
    try {
      const res = await axios.post("http://192.168.30.107:3000/api/todos", {
        title: newExerciseTitle,
        isDone,
      });
      return res?.data;
    } catch (error) {
      console.error("Error add todos:", error);
      throw error; // Ném lỗi nếu không lấy được dữ liệu
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
      return res; // Trả về dữ liệu đã được cập nhật từ API
    } catch (error) {
      console.error("Error updating exercise status:", error);
      throw error; // Ném lỗi nếu không cập nhật được
    }
  },
  deleteTodos: async (_id: string): Promise<any> => {
    try {
      const res = await axios.delete(
        `http://192.168.30.107:3000/api/todos/${_id}`
      );
      console.log("res delete: ", res);
      return;
    } catch (error) {
      console.error("Error delete todos:", error);
      throw error; // Ném lỗi nếu không lấy được dữ liệu
    }
  },
};
