import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { name, email } = await request.json();

    // Check if profile already exists
    const existingProfile = await sql`
      SELECT * FROM profiles WHERE user_id = ${userId}
    `;

    if (existingProfile.rows.length > 0) {
      const profile = existingProfile.rows[0];
      
      // If existing profile has no name and name is provided in the request, update it
      if (!profile.name && name) {
        const updatedProfile = await sql`
          UPDATE profiles
          SET name = ${name}, updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ${userId}
          RETURNING id, user_id, name, email
        `;
        return NextResponse.json(updatedProfile.rows[0], { status: 200 });
      }
      
      return NextResponse.json(profile, { status: 200 });
    }

    // Create new profile
    const result = await sql`
      INSERT INTO profiles (user_id, name, email)
      VALUES (${userId}, ${name}, ${email})
      RETURNING id, user_id, name, email
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}