import { auth } from '@clerk/nextjs/server';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// PATCH /api/todos/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { title, description, deadline, priority, completed } = await request.json();

    const updatedTodo = await sql`
      UPDATE todos
      SET title = ${title},
          description = ${description},
          deadline = ${deadline},
          priority = ${priority},
          completed = ${completed},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id} AND user_id = ${userId}
      RETURNING *
    `;

    if (updatedTodo.rows.length === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/todos/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const deletedTodo = await sql`
      DELETE FROM todos
      WHERE id = ${params.id} AND user_id = ${userId}
      RETURNING *
    `;

    if (deletedTodo.rows.length === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
