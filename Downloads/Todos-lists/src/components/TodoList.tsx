import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo, Filter } from '../types';

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul className="space-y-2" data-testid="todo-list">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-2 p-3 bg-white rounded-lg shadow"
          data-testid="todo-item"
        >
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${todo.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`}
            data-testid="todo-toggle"
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500"
            data-testid="todo-delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}