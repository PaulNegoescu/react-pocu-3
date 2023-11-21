import styles from './Todos.module.css';

export function TodoItem({ todo, onUpdate }) {
  return (
    <li className={styles.todoItem}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onUpdate(todo)}
        />
        {todo.title}
      </label>
    </li>
  );
}
