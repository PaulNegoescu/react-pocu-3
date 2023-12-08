import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Counter,
  FilmList,
  FilmDetails,
  AddFilmForm,
  Parent,
  Todos,
  NotFound,
  Auth,
  AuthContextProvider,
  RequireAuth,
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
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="films" element={<FilmList />} />
          <Route path="films/:id" element={<FilmDetails />} />
          <Route path="films/add" element={<AddFilmForm />} />
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
            element={<Counter initialValue={3} largeStep={10} smallStep={2} />}
          />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
