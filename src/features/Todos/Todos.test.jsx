import { render, screen, mockAuthData } from '@/utils/testUtils';
import { Todos } from '@/features';
import { Route } from 'react-router-dom';
import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';

const mockTodos = [
  {
    id: 1,
    title: 'Test',
    completed: false,
    userId: mockAuthData.user.id,
  },
  {
    id: 2,
    title: 'Test completed',
    completed: true,
    userId: mockAuthData.user.id,
  },
];

beforeEach(() => {
  const mockTodosClone = structuredClone(mockTodos);
  server.use(
    http.get('/todos', () => {
      return HttpResponse.json(mockTodosClone);
    }),
    http.post('/todos', async ({ request }) => {
      const todo = await request.json();
      const newTodo = { id: mockTodosClone.length + 1, ...todo };
      mockTodosClone.push(newTodo);

      return HttpResponse.json(newTodo);
    }),
    http.patch('/todos/:id', async ({ request, params: { id } }) => {
      const todoIndex = mockTodosClone.findIndex(
        (todo) => todo.id === Number(id)
      );
      const newTodo = {
        ...mockTodosClone[todoIndex],
        ...(await request.json()),
      };
      mockTodosClone.splice(todoIndex, 1, newTodo);
      return HttpResponse.json(newTodo);
    }),
    http.delete('/todos/:id', ({ params: { id } }) => {
      const todoIndex = mockTodosClone.findIndex(
        (todo) => todo.id === Number(id)
      );
      mockTodos.splice(todoIndex, 1);
      return HttpResponse.json({});
    })
  );
});

test('Renders todos from the DB', async () => {
  render(<Route path="todos" element={<Todos />} />, ['/todos']);
  expect(await screen.findAllByRole('listitem')).toHaveLength(2);
  expect(
    await screen.findAllByRole('checkbox', { checked: true })
  ).toHaveLength(1);
});

test('Adds todos to the DB and screen', async () => {
  const { user } = render(<Route path="todos" element={<Todos />} />, [
    '/todos',
  ]);

  await user.type(await screen.findByRole('textbox'), 'New Todo 2');

  await user.click(screen.getByRole('button', { name: 'Add' }));
  expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});

test('Can mark todos as completed', async () => {
  const { user } = render(<Route path="todos" element={<Todos />} />, [
    '/todos',
  ]);
  const targetTodo = mockTodos[0];

  await user.click(await screen.findByLabelText(targetTodo.title));
  expect(
    await screen.findAllByRole('checkbox', { checked: true })
  ).toHaveLength(2);
});

test('Can delete all completed todos', async () => {
  const { user } = render(<Route path="todos" element={<Todos />} />, [
    '/todos',
  ]);

  await user.click(await screen.findByRole('button', { name: /delete/i }));
  expect(await screen.findAllByRole('listitem')).toHaveLength(1);
  expect(screen.getByRole('listitem')).toHaveTextContent('Test');
});
