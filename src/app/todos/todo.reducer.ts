import { createReducer, on } from '@ngrx/store';
import { borrar, crear, editar, toggle, toggleAll, limpiarTodos } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Robar escudo capitán américa'),
    new Todo('Plantar naranjo'),
    new Todo('Nada por guardar'),
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(limpiarTodos, (state) => state.filter(todo => !todo.completado)),
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => state.map(todo => {
    return {
      ...todo,
      completado: completado
    };
  })),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    })
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto
        };
      } else {
        return todo;
      }
    })
  })
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
