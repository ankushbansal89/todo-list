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
        <Button onClick={() => onEdit(todo)} variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
