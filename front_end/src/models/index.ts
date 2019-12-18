export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  state: string;
  password?: string;
}

export interface ToDo {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  dueDate?: string;
}
