export interface TodoId {
  id: string;
}

export interface Todo extends TodoId {
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

export interface toggleCheckReqType extends TodoId {
  isCheck: boolean;
}

export interface addTodoReqType {
  content: string;
}

export type editTodoReqType = TodoId & addTodoReqType;
