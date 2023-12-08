import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';

const relatedEntities = {
  characters: [],
  starships: [],
  vehicles: [],
  planets: [],
  species: [],
};

const getRelated = structuredClone(relatedEntities);

export function useFilmApi(id) {
  const [data, setData] = useState(null);
  const [related, setRelated] = useState(structuredClone(relatedEntities));

  const { get: getFilms } = useApi('films');
  ({ get: getRelated.characters } = useApi('characters'));
  ({ get: getRelated.planets } = useApi('planets'));
  ({ get: getRelated.starships } = useApi('starships'));
  ({ get: getRelated.vehicles } = useApi('vehicles'));
  ({ get: getRelated.species } = useApi('species'));

  useEffect(() => {
    async function getData() {
      const data = await getFilms(null, id);
      setData(data);

      if (id) {
        const promises = structuredClone(relatedEntities);
        for (const entity in relatedEntities) {
          for (const entityId of data[entity]) {
            promises[entity].push(getRelated[entity](null, entityId));
          }
        }

        const newRelated = {};
        for (const entity in relatedEntities) {
          const data = await Promise.all(promises[entity]);
          newRelated[entity] = data;
        }
        setRelated(newRelated);
      }
    }

    getData();
  }, [id, getFilms]);

  return [data, related];
}
