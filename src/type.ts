export interface Todoid {
  id: string;
}

export interface Todo extends Todoid {
  content: string;
  isCheck: boolean;
  createdAt: string;
}

export interface RootState {
  todos: TodosState;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
}

export interface toggleCheckReqType extends Todoid {
  isCheck: boolean;
}

export interface addTodoReqType {
  content: string;
}
