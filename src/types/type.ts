export interface IExercise {
  _id: string;
  id_temp: string;
  title: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  isNotSynced?: boolean;
}

export interface UpdateExercisePayload {
  _id: string;
  title: string;
  isDone: boolean;
}
