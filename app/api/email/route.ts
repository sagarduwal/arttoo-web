import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const emails = await sql`SELECT * FROM Emails;`;
  const data = emails.rows;
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) throw new Error('Email is required');

    await sql`CREATE TABLE IF NOT EXISTS Emails (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255)
    );`;
    await sql`INSERT INTO Emails (email) VALUES (${email});`;

    const emails = await sql`SELECT * FROM Emails;`;
    return NextResponse.json({ emails }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
