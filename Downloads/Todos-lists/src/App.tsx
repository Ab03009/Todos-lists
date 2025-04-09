import React, { useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { Todo, Filter } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-thin text-center text-gray-300 mb-8">
          todos
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoInput onAdd={addTodo} />
          {todos.length > 0 && (
            <>
              <TodoList
                todos={todos}
                filter={filter}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
              <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                onClearCompleted={clearCompleted}
                hasCompleted={hasCompleted}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;