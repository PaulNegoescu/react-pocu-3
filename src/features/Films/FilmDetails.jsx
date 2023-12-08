import { useParams } from 'react-router-dom';
import { useFilmApi } from './useFilmApi';

const relatedEntities = [
  'characters',
  'planets',
  'starships',
  'species',
  'vehicles',
];

export function FilmDetails() {
  const { id } = useParams();
  const [film, related] = useFilmApi(id);

  if (!film) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <h1>{film.title}</h1>
      <p>{film.director}</p>
      <img width="200" src={film.poster} alt={`Poster for ${film.title}`} />
      <p>{film.opening_crawl}</p>
      {relatedEntities.map((entity) => (
        <section key={entity}>
          <h2>{entity}</h2>
          <ul>
            {related[entity].map((item) => (
              <li key={`${entity}${item.id}`}>{item.name}</li>
            ))}
          </ul>
        </section>
      ))}

      {/* <Link to={`/films/${(id - 1).toString()}`}>Prev</Link>
      <Link to={`/films/${(+id + 1).toString()}`}>Next</Link> */}
    </>
  );
}
