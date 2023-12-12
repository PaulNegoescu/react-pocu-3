import { useEffect, useState } from 'react';
import { getApi } from '../../utils/api';

const { get: getCharacters } = getApi('characters');

export function Form({ submitFn, handleSubmit, register, errors, heading }) {
  const [characters, setCharacters] = useState(null);
  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  async function onSubmit(values) {
    const data = await submitFn(values);
    console.log(data);
  }

  // "release_date": "1980-05-17",
  // "characters",
  // "planets",
  // "starships",
  // "vehicles",
  // "species",
  if (!characters) {
    return <strong>Loading ...</strong>;
  }
  return (
    <form className="brandForm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="fullWidth">{heading}</h1>
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
        Save Film
      </button>
    </form>
  );
}
