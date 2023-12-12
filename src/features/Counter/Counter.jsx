import { useReducer } from 'react';
import clsx from 'clsx';

import styles from './Counter.module.css';

function countReducer(oldState, action) {
  let newState = oldState;

  switch (action.type) {
    case 'changeCount':
      newState += action.payload;
      break;
    case 'reset':
      newState = action.payload;
      break;
    default:
      break;
  }

  return newState;
}

export function Counter({ initialValue = 0, largeStep = 5, smallStep = 1 }) {
  const [count, dispatch] = useReducer(countReducer, initialValue);

  // const outputCls = count < 0 ? 'negative' : count > 0 ? 'positive' : '';
  // let outputCls = '';
  // if (count > 0) {
  //   outputCls = 'positive';
  // } else if (count < 0) {
  //   outputCls = 'negative';
  // }

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output
          data-testid="output"
          style={{
            '--font-size': `${1 + count / 10}rem`,
          }}
          className={clsx(styles.adaptiveFontSize, {
            [styles.negative]: count < 0,
            [styles.positive]: count > 0,
          })}
        >
          {count}
        </output>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'changeCount', payload: -largeStep })}
        >
          -{largeStep}
        </button>
        <button
          onClick={() => dispatch({ type: 'changeCount', payload: -smallStep })}
        >
          -{smallStep}
        </button>
        <button
          onClick={() => dispatch({ type: 'reset', payload: initialValue })}
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: 'changeCount', payload: smallStep })}
        >
          +{smallStep}
        </button>
        <button
          onClick={() => dispatch({ type: 'changeCount', payload: largeStep })}
        >
          +{largeStep}
        </button>
      </p>
    </>
  );
}

// let state = null;
// function myUseState(initialState) {
//   if(!state) {
//     state = initialState;
//   }
//   function setState(newState) {
// if(newState !== state) {
//   state = newState;
//   Counter();
// }
//   }
//   return [state, setState];
// }

// const [count, setCount] = myUseState(0);
