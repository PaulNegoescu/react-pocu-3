import { useState } from 'react';
import { Child } from './Child';

export function Parent() {
  const [value, setValue] = useState('');

  function handleChange(val) {
    setValue(val);
  }

  return (
    <>
      <h1>Parent</h1>
      <p>Current value in parent is: "{value}"</p>
      <button onClick={() => handleChange(Math.random())}>Change Value</button>
      <Child val={value} onChange={handleChange} />
    </>
  );
}
