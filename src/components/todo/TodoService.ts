import { Todos } from 'type';

export default class TodoService {
  public static async getTodos(): Promise<Todos[]> {
    const response = await fetch('http://localhost:5000/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = JSON.parse(await response.json()).todos;
    return data;
  }

  public static async addTodo(content: string): Promise<void> {
    const response = await fetch('http://localhost:5000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    })
      .then((res) => {
        console.log(res.json(), '    response.json()');
      })
      .catch((err) => {
        console.log(err, '    .. err');
      });
  }
}
