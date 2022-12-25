interface TodoState {
  userId: number;
  id: number;
  title: string;
  description: string;
  duration: number;
  inProgress: boolean;
  completed: boolean;
  backgroundColor: string;
  borderColor: string;
}

export default TodoState;
