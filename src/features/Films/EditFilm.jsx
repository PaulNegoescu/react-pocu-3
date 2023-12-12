import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { array, date, number, object, string } from 'yup';
import { useFilmApi } from './useFilmApi';
import { Form } from './Form';
import { useParams } from 'react-router-dom';

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

export function EditFilm() {
  const { id } = useParams();
  const { data: film, updateFilm, getFilm } = useFilmApi(id, false);
  const formOptions = {
    defaultValues: getFilm,
    resolver: yupResolver(filmSchema),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm(formOptions);

  // useEffect(() => {
  //   const fieldsToSet = [
  //     'title',
  //     'episode_id',
  //     'opening_crawl',
  //     'director',
  //     'poster',
  //     'producer',
  //     'release_date',
  //   ];
  //   if (film) {
  //     for (const field of fieldsToSet) {
  //       setValue(field, film[field]);
  //     }
  //   }
  // }, [film, setValue]);

  if (!film) {
    return <strong>Loading ...</strong>;
  }

  return (
    <Form
      submitFn={updateFilm}
      heading={`Editing "${film.title}"`}
      {...{ register, handleSubmit, errors }}
    />
  );
}
