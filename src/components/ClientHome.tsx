'use client';

import { Sidebar } from '@/components/Sidebar';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useTodos } from '@/components/useTodos';
import { Todo, TodoFormValues } from '@/types/types';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ClientHome() {
  const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showNewTodoModal, setShowNewTodoModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'incomplete' | 'completed' | 'today'>('all');

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

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'incomplete':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        return todos.filter((todo) => todo.deadline?.startsWith(today));
      default:
        return todos;
    }
  }, [todos, filter]);

  const allTasksCount = todos.length;
  const incompleteTasksCount = todos.filter((todo) => !todo.completed).length;
  const completedTasksCount = todos.filter((todo) => todo.completed).length;
  const todayTasksCount = todos.filter((todo) => {
    const today = new Date().toISOString().split('T')[0];
    return todo.deadline?.startsWith(today);
  }).length;

  const getHeadingText = () => {
    switch (filter) {
      case 'all':
        return 'All Tasks';
      case 'incomplete':
        return 'Incomplete Tasks';
      case 'completed':
        return 'Completed Tasks';
      case 'today':
        return "Today's Tasks";
      default:
        return 'Your Tasks';
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        allTasksCount={allTasksCount}
        incompleteTasksCount={incompleteTasksCount}
        completedTasksCount={completedTasksCount}
        todayTasksCount={todayTasksCount}
        onFilterChange={setFilter}
        currentFilter={filter}
      />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{getHeadingText()}</h2>
          <Dialog open={showNewTodoModal} onOpenChange={setShowNewTodoModal}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowNewTodoModal(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </DialogTrigger>
            <TodoForm
              initialValues={editingTodo || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Dialog>
        </div>

        <TodoList
          todos={filteredTodos}
          onEdit={handleEdit}
          onDelete={deleteTodo}
          onUpdateStatus={(todo: Todo) =>
            updateTodo(todo.id, { ...todo, completed: !todo.completed })
          }
        />
      </main>
    </div>
  );
}
