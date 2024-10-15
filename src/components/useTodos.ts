import { useEffect, useState } from 'react';
import { Todo, TodoFormValues } from '@/types/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (todo: TodoFormValues) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...todo, deadline: todo.deadline ? new Date(todo.deadline).toISOString() : null}),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      const createdTodo = await response.json();
      setTodos([createdTodo, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (id: number, updates: TodoFormValues) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updates, deadline: updates.deadline ? new Date(updates.deadline).toISOString() : null }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return { todos, createTodo, updateTodo, deleteTodo };
}
