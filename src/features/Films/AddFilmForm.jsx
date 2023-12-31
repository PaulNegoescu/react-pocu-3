import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { array, date, number, object, string } from 'yup';
import { useFilmApi } from './useFilmApi';
import { Form } from './Form';

const filmSchema = object({
  title: string().required().min(4),
  episode_id: number().optional(),
  opening_crawl: string().required().min(5),
  director: string().required(),
  poster: string().required().url(),
  producer: string().required(),
  release_date: date().required(),
  characters: array(number()),
  // planets: array(number()),
  // starships: array(number()),
  // vehicles: array(number()),
  // species: array(number()),
});

export function AddFilmForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filmSchema),
  });
  const { addFilm } = useFilmApi(null, false);

  return (
    <Form
      submitFn={addFilm}
      heading="Add a new Film"
      {...{ register, handleSubmit, errors }}
    />
  );
}
