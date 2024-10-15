'use client';

import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { Button } from '@/components/ui/button';
import { useTodos } from '@/components/useTodos';
import { Todo, TodoFormValues } from '@/types/types';
import { UserButton, useUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function ClientHome() {
  const { user } = useUser();
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);

  const handleSubmit = async (values: TodoFormValues) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, values);
    } else {
      await createTodo(values);
    }
    setEditingTodo(null);
    setShowNewTodoModal(false);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowNewTodoModal(true);
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setShowNewTodoModal(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="mb-8 flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome to your Todo List, {user?.fullName}</h1>
        <UserButton />
      </div>

      <div className="w-full max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <Button onClick={() => setShowNewTodoModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>

        <TodoList
          todos={todos}
          onEdit={handleEdit}
          onDelete={deleteTodo}
          onUpdateStatus={(todo: TodoFormValues) =>
            updateTodo(todo.id, { ...todo, completed: todo.completed })
          }
        />
      </div>

      {showNewTodoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-4">
            <TodoForm
              initialValues={editingTodo || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </main>
  );
}
