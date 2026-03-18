import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { createToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM admin_users WHERE username = ?',
      args: [username],
    });
    const user = result.rows[0] as unknown as
      | { id: number; username: string; password_hash: string }
      | undefined;

    if (!user || !bcrypt.compareSync(password, user.password_hash as string)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createToken({
      id: user.id as number,
      username: user.username as string,
    });

    const response = NextResponse.json({ success: true, username: user.username });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
