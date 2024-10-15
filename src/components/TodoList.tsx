import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Todo } from '@/types/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (todo: Todo) => void;
}

export default function TodoList({ todos, onEdit, onDelete, onUpdateStatus }: TodoListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
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
