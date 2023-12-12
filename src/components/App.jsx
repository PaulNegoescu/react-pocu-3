import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Counter,
  Parent,
  Todos,
  NotFound,
  Auth,
  AuthContextProvider,
  RequireAuth,
  FilmLayout,
} from '@/features';
import { Nav } from './Nav/Nav';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/">
            <Route index element={<h1>Home</h1>} />
            <Route path="films/*" element={<FilmLayout />} />
            <Route
              path="todos"
              element={
                <RequireAuth>
                  <Todos />
                </RequireAuth>
              }
            />
            <Route path="comm" element={<Parent />} />
            <Route
              path="counter"
              element={
                <Counter initialValue={3} largeStep={10} smallStep={2} />
              }
            />
            <Route path="login" element={<Auth />} />
            <Route path="register" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin"></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
