import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Todo } from '@/types/types';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (todo: Todo) => void;
}

type SortField = 'deadline' | 'priority';
type SortOrder = 'asc' | 'desc';

export default function TodoList({ todos, onEdit, onDelete, onUpdateStatus }: TodoListProps) {
  const [sortField, setSortField] = useState<SortField>('deadline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    // First, sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then, sort by the selected field
    if (sortField === 'deadline') {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return sortOrder === 'asc'
        ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    } else {
      if (!a.priority && !b.priority) return 0;
      if (!a.priority) return 1;
      if (!b.priority) return -1;
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('deadline')}
              className="p-0 hover:bg-transparent"
            >
              Deadline
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('priority')}
              className="p-0 hover:bg-transparent"
            >
              Priority
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </TableBody>
    </Table>
  );
}
