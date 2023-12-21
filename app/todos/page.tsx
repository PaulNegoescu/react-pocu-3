import { revalidateTag } from 'next/cache';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default async function Todos() {
  const todos: Todo[] = await fetch('http://localhost:3001/todos', {
    next: { tags: ['todoList'] },
  }).then((res) => res.json());

  async function addTodo(data) {
    'use server';

    const newTodo = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: data.get('title'),
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());

    revalidateTag('todoList');
  }

  return (
    <>
      <h1 className="text-4xl">Todos</h1>
      <form action={addTodo}>
        <label htmlFor="title">What do you want to do?</label>
        <input type="text" name="title" id="title" className="text-black" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" defaultChecked={todo.completed} />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
