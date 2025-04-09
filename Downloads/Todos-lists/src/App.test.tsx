import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Todo App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should add a new todo', async () => {
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New Todo');
    await userEvent.keyboard('{Enter}');
    
    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(screen.getByTestId('todos-count')).toHaveTextContent('1 item left');
  });

  it('should toggle todo completion', async () => {
    // Add a todo
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'Toggle Todo');
    await userEvent.keyboard('{Enter}');

    // Toggle it
    const toggleButton = screen.getByTestId('todo-toggle');
    await userEvent.click(toggleButton);

    expect(screen.getByText('Toggle Todo')).toHaveStyle({
      textDecoration: 'line-through',
    });
    expect(screen.getByTestId('todos-count')).toHaveTextContent('0 items left');
  });

  it('should filter todos', async () => {
    // Add two todos
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'Active Todo');
    await userEvent.keyboard('{Enter}');
    await userEvent.type(input, 'Completed Todo');
    await userEvent.keyboard('{Enter}');

    // Complete one todo
    const toggleButtons = screen.getAllByTestId('todo-toggle');
    await userEvent.click(toggleButtons[1]);

    // Filter active
    await userEvent.click(screen.getByTestId('filter-active'));
    expect(screen.getByText('Active Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();

    // Filter completed
    await userEvent.click(screen.getByTestId('filter-completed'));
    expect(screen.queryByText('Active Todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
  });

  it('should clear completed todos', async () => {
    // Add and complete a todo
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'Todo to clear');
    await userEvent.keyboard('{Enter}');
    await userEvent.click(screen.getByTestId('todo-toggle'));

    // Clear completed
    await userEvent.click(screen.getByTestId('clear-completed'));
    expect(screen.queryByText('Todo to clear')).not.toBeInTheDocument();
  });
});