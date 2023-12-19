import { render, screen } from '@/utils/testUtils';
import { Counter } from './Counter';

test('The counter works as expected', async () => {
  const { user } = render(<Counter />);
  // console.log(screen.debug());
  expect(screen.getByRole('heading')).toHaveTextContent('Counter');
  await user.click(screen.getByText('-1'));
  expect(screen.getByTestId('output')).toHaveTextContent('-1');
});
