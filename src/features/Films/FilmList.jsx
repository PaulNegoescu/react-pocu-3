import { FilmCard } from './FilmCard';
import { useFilmApi } from './useFilmApi';

import styles from './Films.module.css';

export function FilmList() {
  const [films] = useFilmApi();

  return (
    <section className={styles.list}>
      <h1>Films</h1>
      {!films && <strong>Loading ...</strong>}
      {films && films.map((item) => <FilmCard key={item.id} film={item} />)}
    </section>
  );
}
