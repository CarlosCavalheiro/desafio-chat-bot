import React, { useState, useEffect } from 'react';
import MateriaForm from './components/MateriaForm';
import MateriaList from './components/MateriaList';

const App = () => {
  const [materias, setMaterias] = useState([]);
  const { storage } = useJsonFileStorage('materias.json');

  // useEffect(() => {
  //   storage.get().then((data) => setMaterias(data || []));
  // }, [storage]);
  useEffect(() => {
    fetch('http://localhost:3000/materias') // URL do JSON Server
      .then((response) => response.json())
      .then((data) => setMaterias(data));
  }, []);

  const handleCadastro = (materia) => {
    setMaterias([...materias, materia]);
  };

  const handleEdit = (materia) => {
    const index = materias.findIndex((m) => m.id === materia.id);
    const newMaterias = [...materias];
    newMaterias[index] = materia;
    setMaterias(newMaterias);
    storage.set(newMaterias);
  };

  const handleDelete = (id) => {
    const newMaterias = materias.filter((materia) => materia.id !== id);
    setMaterias(newMaterias);
    storage.set(newMaterias);
  };

  return (
    <div className="App">
      <h1>Cadastro de Matérias</h1>
      <MateriaForm onSubmit={handleCadastro} />
      <MateriaList materias={materias} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
