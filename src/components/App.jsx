import { Counter } from '../features/Counter/Counter';
import { Todos } from '../features/Todos/Todos';

export function App() {
  return (
    <>
      <Todos />
      {/* <Counter />
      <Counter initialValue={3} largeStep={10} smallStep={2} /> */}
    </>
  );
}
