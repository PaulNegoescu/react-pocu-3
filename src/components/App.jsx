import { Counter } from '../features/Counter/Counter';

export function App() {
  return (
    <>
      <Counter />
      <Counter initialValue={3} largeStep={10} smallStep={2} />
    </>
  );
}
