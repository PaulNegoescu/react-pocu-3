import { Link } from 'react-router-dom';
import styles from './Films.module.css';

export function FilmCard({ film }) {
  return (
    <article className={styles.card}>
      <Link to={`${film.id}`}>
        <img src={film.poster} alt={`Poster for ${film.title}`} />
        <h1>{film.title}</h1>
      </Link>
    </article>
  );
}
