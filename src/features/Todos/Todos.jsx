import { useRef, useState } from 'react';
import styles from './Todos.module.css';

const todoList = [
  { id: 1, title: 'Buy milk', completed: true },
  { id: 2, title: 'Go to work', completed: false },
  { id: 3, title: 'Enjoy Weekend', completed: false },
  { id: 4, title: 'Sleep', completed: false },
];

// const propName = 'firstName';
// const o = {
//   prop: 'clasic',
//   todoList,
//   [propName]: 'valaoare'
// };
// o[propName] = 'valoare';

export function Todos() {
  const [todos, setTodos] = useState(todoList);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const titleRef = useRef();

  // Classical Javascript Way
  function handleSubmitJs(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const todoTitle = data.get('title');
    if (
      todos.some((todo) => todo.title.toLowerCase() === todoTitle.toLowerCase())
    ) {
      setError('That todo already exists.');
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    titleRef.current.focus();
    titleRef.current.value = '';
  }

  // The controlled input way
  function handleSubmitReact(e) {
    e.preventDefault();

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
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

  function updateCompleted(todo) {
    const newTodos = todos.map((t) => {
      if (t === todo) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(newTodos);

    // todo.completed = !todo.completed;
    // setTodos([...todos]);
  }

  return (
    <>
      <h1>Todos</h1>
      {title}
      <form onSubmit={handleSubmitReact}>
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
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateCompleted(todo)}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
