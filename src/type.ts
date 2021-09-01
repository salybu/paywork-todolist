export interface Todos {
  id: string;
  content: string;
  isCheck: boolean;
  createdAt: string;
}

export interface RootState {
  todos: TodosState;
}

export interface TodosState {
  todos: Todos[];
  loading: boolean;
  error: Error | null;
}
