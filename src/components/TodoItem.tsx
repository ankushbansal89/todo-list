import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { Todo } from '@/types/types';
import { Edit, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateStatus: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit, onDelete, onUpdateStatus }: TodoItemProps) {
  const handleStatusChange = () => {
    onUpdateStatus({ ...todo, completed: !todo.completed });
  };

  return (
    <TableRow className={todo.completed ? 'text-muted-foreground line-through' : ''}>
      <TableCell>
        <Checkbox checked={todo.completed} onCheckedChange={handleStatusChange} />
      </TableCell>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>{todo.deadline && new Date(todo.deadline).toLocaleDateString()}</TableCell>
      <TableCell>{todo.priority}</TableCell>
      <TableCell className="text-right">
        <Button onClick={() => onEdit(todo)} variant="outline" size="sm" className="mr-2">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button onClick={() => onDelete(todo.id)} variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
