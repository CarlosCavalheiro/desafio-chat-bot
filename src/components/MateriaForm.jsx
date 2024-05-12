import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const MateriaForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { storage } = useJsonFileStorage('materias.json');

  const onSubmit = (data) => {
    const materia = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      dataPublicacao: new Date().toLocaleDateString(),
    };

    storage.set(materia);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('titulo', { required: true })} placeholder="Título" />
      {errors.titulo && <span className="error">Título é obrigatório</span>}

      <input type="text" {...register('autor', { required: true })} placeholder="Autor" />
      {errors.autor && <span className="error">Autor é obrigatório</span>}

      <textarea {...register('resumo', { required: true })} placeholder="Resumo" />
      {errors.resumo && <span className="error">Resumo é obrigatório</span>}

      <textarea {...register('conteudo', { required: true })} placeholder="Conteúdo completo" />
      {errors.conteudo && <span className="error">Conteúdo é obrigatório</span>}

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default MateriaForm;
