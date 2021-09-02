import { Todo } from 'type';
import { TODO_URL } from 'config';

export default class TodoService {
  public static async getTodos(): Promise<Todo[]> {
    const response = await fetch(TODO_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

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
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

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
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

  public static async deleteTodo(id: string): Promise<Todo[]> {
    console.log('todoService deletodos');
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

  public static async editTodo(id: string, content: string): Promise<Todo[]> {
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const data = JSON.parse(await response.json()).todos;
    return data;
  }
}
