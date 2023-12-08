import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { array, date, number, object, string } from 'yup';
import { useFilmApi } from './useFilmApi';
import { getApi } from '../../utils/api';
import { useEffect, useState } from 'react';

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

const { get: getCharacters } = getApi('characters');

export function AddFilmForm() {
  const [characters, setCharacters] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filmSchema),
  });

  const { addFilm } = useFilmApi(null, false);

  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  async function onSubmit(values) {
    const data = await addFilm(values);
    console.log(data);
  }

  // "release_date": "1980-05-17",
  // "characters",
  // "planets",
  // "starships",
  // "vehicles",
  // "species",
  return (
    <form className="brandForm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="fullWidth">Add a film</h1>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" {...register('title')} />
      {errors.title && (
        <p className="secondColumn fieldError">{errors.title.message}</p>
      )}

      <label htmlFor="episode_id">Episode</label>
      <input type="number" id="episode_id" {...register('episode_id')} />
      {errors.episode_id && (
        <p className="secondColumn fieldError">{errors.episode_id.message}</p>
      )}

      <label htmlFor="opening_crawl">Opening Crawl</label>
      <textarea id="opening_crawl" {...register('opening_crawl')} />
      {errors.opening_crawl && (
        <p className="secondColumn fieldError">
          {errors.opening_crawl.message}
        </p>
      )}

      <label htmlFor="director">Director</label>
      <input type="text" id="director" {...register('director')} />
      {errors.director && (
        <p className="secondColumn fieldError">{errors.director.message}</p>
      )}

      <label htmlFor="producer">Producer</label>
      <input type="text" id="producer" {...register('producer')} />
      {errors.producer && (
        <p className="secondColumn fieldError">{errors.producer.message}</p>
      )}

      <label htmlFor="poster">Poster</label>
      <input type="url" id="poster" {...register('poster')} />
      {errors.poster && (
        <p className="secondColumn fieldError">{errors.poster.message}</p>
      )}

      <label htmlFor="release_date">Release Date</label>
      <input type="date" id="release_date" {...register('release_date')} />
      {errors.release_date && (
        <p className="secondColumn fieldError">{errors.release_date.message}</p>
      )}

      <span>Characters</span>
      <section>
        {characters?.map((ch) => (
          <label key={ch.id}>
            <input type="checkbox" value={ch.id} {...register('characters')} />
            {ch.name}
          </label>
        ))}
      </section>

      <button type="submit" className="btn secondColumn">
        Add Film
      </button>
    </form>
  );
}
