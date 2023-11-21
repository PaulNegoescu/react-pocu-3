import { useEffect, useRef, useState } from 'react';
import { TodoItem } from './TodoItem';

function sortTodos(todoA, todoB) {
  if (todoA.completed === todoB.completed) {
    return 0;
  } else if (todoA.completed && !todoB.completed) {
    return -1;
  }
  return 1;
}

export function Todos() {
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const titleRef = useRef();

  useEffect(() => {
    async function getTodos() {
      const data = await fetch('http://localhost:3000/todos').then((res) =>
        res.json()
      );
      setTodos(data);
    }
    getTodos();
  }, []);

  async function handleAddTodo(e) {
    e.preventDefault();

    const newTodo = {
      userId: 1,
      title,
      completed: false,
    };

    const todo = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then((res) => res.json());

    setTodos([...todos, todo]);
    titleRef.current.focus();
    setTitle('');
  }

  function handleChange(e) {
    const todoTitle = e.target.value;
    if (
      todos.some((todo) => todo.title.toLowerCase() === todoTitle.toLowerCase())
    ) {
      setError('That todo already exists.');
    } else {
      setError('');
    }
    setTitle(todoTitle);
  }

  async function updateCompleted(todo) {
    todo.completed = !todo.completed;
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    setTodos([...todos]);
  }

  async function handleDeleteAll() {
    const promises = todos
      .filter((todo) => todo.completed)
      .map((todo) =>
        fetch(`http://localhost:3000/todos/${todo.id}`, { method: 'DELETE' })
      );

    await Promise.all(promises);

    setTodos(todos.filter((todo) => !todo.completed));
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="title">What do you want to do?</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          value={title}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
        <p>{error}</p>
      </form>
      <ul>
        {todos?.toSorted(sortTodos).map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={updateCompleted} />
        ))}
      </ul>
      <button type="button" onClick={handleDeleteAll}>
        Delete all completed
      </button>
    </>
  );
}