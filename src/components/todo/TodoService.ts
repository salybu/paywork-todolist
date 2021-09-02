import { Todo } from 'type';
import { TODO_URL } from 'config';

// 서버 통신 API Class
export default class TodoService {
  /* 모든 Todos 조회 API 호출
    URL: BASE_URL/todo
    response: { "todoList": [ { todo Task }, { todo Task } .. ] } */
  public static async getTodos(): Promise<Todo[]> {
    const response = await fetch(TODO_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({}),
    });
    const data = JSON.parse(await response.json()).todoList;
    return data; // response 중 todoList 를 return
  }

  /* 기존 Todo isCheck 변경 API 호출
    URL: BASE_URL/todo/id
    request: { "isCheck": boolean }
    response: { "todoList": [ { todo Task }, { todo Task } .. ] } */
  public static async toggleIsCheckTodos(id: string, isCheck: boolean): Promise<Todo[]> {
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCheck: isCheck,
      }),
    });
    const data = JSON.parse(await response.json()).todoList;
    return data; // response 중 todoList 를 return
  }

  /* 신규 Todo 추가 API 호출
    URL: BASE_URL/todo
    request: { "content": string }
    response: { "todoList": [ { todo Task }, { todo Task } .. ] } */
  public static async addTodo(content: string): Promise<Todo[]> {
    const response = await fetch(TODO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    });
    const data = JSON.parse(await response.json()).todoList;
    return data;
  }

  /* 기존 Todo 삭제 API 호출
    URL: BASE_URL/todo/id
    request: {}
    response: { "todoList": [ { todo Task }, { todo Task } .. ] } */
  public static async deleteTodo(id: string): Promise<Todo[]> {
    console.log('todoService deletodos');
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = JSON.parse(await response.json()).todoList;
    return data;
  }

  /* 기존 Todo 수정 API 호출
    URL: BASE_URL/todo/id
    request: { "content": string }
    response: { "todoList": [ { todo Task }, { todo Task } .. ] } */
  public static async editTodo(id: string, content: string): Promise<Todo[]> {
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const data = JSON.parse(await response.json()).todoList;
    return data;
  }
}
