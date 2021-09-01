import { Todo } from 'type';

const BASE_URL = `http://localhost:5000`;
const TODO_URL = BASE_URL + `/todo`;

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

  public static async toggleIsCheckTodos(id: string, isCheck: boolean): Promise<void> {
    const response = await fetch(TODO_URL + `/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCheck: isCheck,
      }),
    });
    // console.log(response.json(), '      here in TodoService toggleIsCheckTodos');
    // return response.json();
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

  public static async addTodo(content: string): Promise<void> {
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
}
