import { useAuthContext } from '../Auth/AuthContext';

export function Child({ val, onChange }) {
  return (
    <>
      <h2>Child</h2>
      <button onClick={() => onChange('child ' + Math.random())}>
        Change in child
      </button>
      <p>Current value in child is: "{val}"</p>
      <Child2 val={val} onChange={onChange} />
    </>
  );
}

export function Child2({ val, onChange }) {
  console.log('child2');
  const { user } = useAuthContext();
  return (
    <>
      <h2>GrnadChild</h2>
      <button onClick={() => onChange('child ' + Math.random())}>
        Change in child
      </button>
      <p>Current value in child is: "{val}"</p>
      <p>The firstName: "{user?.firstName}"</p>
    </>
  );
}
