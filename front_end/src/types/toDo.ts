export interface ToDo {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  dueDate?: string;
}
