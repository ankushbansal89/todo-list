import * as z from 'zod';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  completed: boolean;
}

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  deadline: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val instanceof Date ? val.toISOString() : val)),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  completed: z.boolean().default(false),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
