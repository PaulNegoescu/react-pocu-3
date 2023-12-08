import { FilmCard } from './FilmCard';
import { useFilmApi } from './useFilmApi';
import { Link } from 'react-router-dom';
import { HiPlusCircle } from 'react-icons/hi2';

import styles from './Films.module.css';
import { useAuthContext } from '../Auth/AuthContext';

export function FilmList() {
  const { data: films } = useFilmApi();
  const { user } = useAuthContext();

  return (
    <section className={styles.list}>
      <h1>Films</h1>
      {user && (
        <Link className={styles.actionButton} to="add">
          <HiPlusCircle />
          Add a Film
        </Link>
      )}
      {!films && <strong>Loading ...</strong>}
      {films && films.map((item) => <FilmCard key={item.id} film={item} />)}
    </section>
  );
}
