import { useEffect, useRef, useState } from 'react';
import { TodoItem } from './TodoItem';
import { useAuthContext } from '../Auth/AuthContext';
import { useApi } from '../../hooks/useApi';

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
  const { accessToken, user } = useAuthContext();
  const { get, post, patch, remove } = useApi('todos');

  useEffect(() => {
    async function getTodos() {
      const data = await get({ userId: user?.id }, null, { accessToken });
      setTodos(data);
    }
    getTodos();
  }, [accessToken, user, get]);

  async function handleAddTodo(e) {
    e.preventDefault();

    const newTodo = {
      userId: user.id,
      title,
      completed: false,
    };

    const todo = await post(newTodo, { accessToken });

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
    await patch(todo.id, todo, { accessToken });
    setTodos([...todos]);
  }

  async function handleDeleteAll() {
    const promises = todos
      .filter((todo) => todo.completed)
      .map((todo) => remove(todo.id, { accessToken }));

    await Promise.all(promises);

    setTodos(todos.filter((todo) => !todo.completed));
  }

  if (typeof todos !== 'object') {
    return 'Please login and try again.';
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
        {todos &&
          todos
            .toSorted(sortTodos)
            .map((todo) => (
              <TodoItem key={todo.id} todo={todo} onUpdate={updateCompleted} />
            ))}
      </ul>
      <button type="button" onClick={handleDeleteAll}>
        Delete all completed
      </button>
    </>
  );
}
