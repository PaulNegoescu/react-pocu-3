import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuthContext } from '../Auth/AuthContext';

const relatedEntities = {
  characters: [],
  starships: [],
  vehicles: [],
  planets: [],
  species: [],
};

const getRelated = structuredClone(relatedEntities);

export function useFilmApi(id, shouldRequestOnLoad = true) {
  const [data, setData] = useState(null);
  const [related, setRelated] = useState(structuredClone(relatedEntities));
  const { accessToken } = useAuthContext();

  const { get: getFilms, remove, post, patch } = useApi('films');
  ({ get: getRelated.characters } = useApi('characters'));
  ({ get: getRelated.planets } = useApi('planets'));
  ({ get: getRelated.starships } = useApi('starships'));
  ({ get: getRelated.vehicles } = useApi('vehicles'));
  ({ get: getRelated.species } = useApi('species'));

  const getFilm = useCallback(async () => {
    const data = await getFilms(null, id);
    setData(data);

    if (id) {
      const promises = structuredClone(relatedEntities);
      for (const entity in relatedEntities) {
        if (data[entity]?.length) {
          for (const entityId of data[entity]) {
            promises[entity].push(getRelated[entity](null, entityId));
          }
        }
      }

      const newRelated = {};
      for (const entity in relatedEntities) {
        const data = await Promise.all(promises[entity]);
        newRelated[entity] = data;
      }
      setRelated(newRelated);
    }
    console.log(data);
    return data;
  }, [id, getFilms]);

  useEffect(() => {
    if (shouldRequestOnLoad) {
      getFilm();
    }
  }, [shouldRequestOnLoad, getFilm]);

  function deleteFilm() {
    return remove(id, { accessToken });
  }

  function addFilm(body) {
    return post(body, { accessToken });
  }

  function updateFilm(body) {
    console.log(body);
    return patch(id, body, { accessToken });
  }
  return { data, related, deleteFilm, addFilm, updateFilm, getFilm };
}
