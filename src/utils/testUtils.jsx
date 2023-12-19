import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import { AuthContextProvider } from '@/features';
import { MemoryRouter, Routes } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

export const mockAuthData = {
  accessToken: 'dummyToken',
  user: { id: 199, firstName: 'Test' },
};

function defaultWrapper(initialRouteEntries) {
  return ({ children }) => (
    <AuthContextProvider initialValue={mockAuthData}>
      <MemoryRouter initialEntries={initialRouteEntries}>
        <Routes>{children}</Routes>
      </MemoryRouter>
    </AuthContextProvider>
  );
}

function customRender(node, initialRouteEntries, options = {}) {
  const user = userEvent.setup();
  return {
    ...render(node, {
      wrapper: initialRouteEntries && defaultWrapper(initialRouteEntries),
      ...options,
    }),
    user,
  };
}

export * from '@testing-library/react';
export { customRender as render };
