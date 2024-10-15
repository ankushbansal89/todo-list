import * as z from "zod";

export interface Todo {
  id: number;
  title: string;
  description?: string | undefined;
  deadline?: Date | undefined;
  priority: 'low' | 'medium' | 'high';
  completed?: boolean;
}

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.date().optional().refine((date) => !date || date > new Date(), {
    message: "Deadline must be in the future",
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: "Priority is required",
  }),
  completed: z.boolean().optional(),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
