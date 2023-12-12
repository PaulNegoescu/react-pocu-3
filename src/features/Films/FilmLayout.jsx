import { Route, Routes } from 'react-router-dom';
import { AddFilmForm, EditFilm, FilmDetails, FilmList } from '.';

export function FilmLayout() {
  return (
    <>
      <h1 className="text-4xl">Films</h1>
      <Routes>
        <Route index element={<FilmList />} />
        <Route path=":id" element={<FilmDetails />} />
        <Route path="add" element={<AddFilmForm />} />
        <Route path=":id/edit" element={<EditFilm />} />
      </Routes>
    </>
  );
}
