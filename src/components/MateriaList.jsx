import React, { useState, useEffect } from 'react';
import MateriaItem from './MateriaItem';

const MateriaList = () => {
  const [materias, setMaterias] = useState([]);
  const { storage } = useJsonFileStorage('materias.json');

  useEffect(() => {
    storage.get().then((data) => setMaterias(data || []));
  }, [storage]);

  return (
    <ul>
      {materias.map((materia) => (
        <MateriaItem key={materia.id} materia={materia} />
      ))}
    </ul>
  );
};

export default MateriaList;
