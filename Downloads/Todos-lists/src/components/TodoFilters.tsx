import React from 'react';
import { Filter } from '../types';

interface TodoFiltersProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeCount: number;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  onClearCompleted,
  hasCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <span data-testid="todos-count">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? 'bg-purple-500 text-white' : 'hover:bg-purple-100'
            }`}
            data-testid={`filter-${f}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="text-gray-500 hover:text-gray-700"
          data-testid="clear-completed"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}