import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Counter } from './Counter';

test('The counter works as expected', () => {
  render(<Counter />);
  console.log(screen.debug());
  expect(screen.getByRole('heading')).toHaveTextContent('Counter');
  fireEvent.click(screen.getByText('-1'));
  expect(screen.getByTestId('output')).toHaveTextContent('-1');
});
