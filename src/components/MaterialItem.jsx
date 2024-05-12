import React from 'react';

const MateriaItem = ({ materia, onEdit, onDelete }) => {
  return (
    <li key={materia.id}>
      <h2>{materia.titulo}</h2>
      <p>Por {materia.autor} - {materia.dataPublicacao}</p>
      <p>{materia.resumo}</p>
      <button onClick={() => onEdit(materia)}>Editar</button>
      <button onClick={() => onDelete(materia.id)}>Excluir</button>
    </li>
  );
};

export default MateriaItem;
