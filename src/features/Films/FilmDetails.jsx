import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiOutlineTrash, HiOutlinePencilSquare } from 'react-icons/hi2';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFilmApi } from './useFilmApi';
import { useAuthContext } from '../Auth/AuthContext';

import styles from './Films.module.css';
import clsx from 'clsx';

const relatedEntities = [
  'characters',
  'planets',
  'starships',
  'species',
  'vehicles',
];

export function FilmDetails() {
  const { id } = useParams();
  const { data: film, related, deleteFilm } = useFilmApi(id);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteFilm();
    navigate('/films');
  }
  if (!film) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <h1 className="text-3xl">{film.title}</h1>
      {user && (
        <Dialog>
          <p>Actions:</p>
          <p>
            <DialogTrigger asChild>
              <button
                type="button"
                className={clsx(styles.actionButton, styles.danger)}
              >
                <HiOutlineTrash />
                Delete
              </button>
            </DialogTrigger>
            <Link to="edit" className={styles.actionButton}>
              <HiOutlinePencilSquare />
              Edit
            </Link>
          </p>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete "
                {film.title}".
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDelete}>
                Yes, I'm sure!
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <p>{film.director}</p>
      <img width="200" src={film.poster} alt={`Poster for ${film.title}`} />
      <p>{film.opening_crawl}</p>
      {relatedEntities.map((entity) => (
        <section key={entity}>
          <h2>{entity[0].toUpperCase() + entity.substring(1)}</h2>
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
