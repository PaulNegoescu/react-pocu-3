import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output>{count}</output>
      </p>
      <p>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </p>
    </>
  );
}