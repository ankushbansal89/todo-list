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
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) => onUpdateStatus({ ...todo, completed: checked as boolean })}
        />
      </TableCell>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>
        {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No deadline'}
      </TableCell>
      <TableCell>{todo.priority}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-1">
          <Button onClick={() => onEdit(todo)} variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(todo.id)}
            variant="ghost"
            size="icon"
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
