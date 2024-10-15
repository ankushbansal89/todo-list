import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// GET /api/todos
export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const todos = await sql`
      SELECT * FROM todos
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(todos.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, description, deadline, priority } = await request.json();

    const newTodo = await sql`
      INSERT INTO todos (user_id, title, description, deadline, priority)
      VALUES (${userId}, ${title}, ${description || null}, ${deadline || null}, ${priority})
      RETURNING *
    `;

    return NextResponse.json(newTodo.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
