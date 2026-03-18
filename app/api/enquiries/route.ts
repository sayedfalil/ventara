import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { headers } from 'next/headers';

// Simple in-memory rate limiter: 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { full_name, email, phone, package_name, travelers, travel_date, message, source_url } = body;

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: `INSERT INTO enquiries (full_name, email, phone, package_name, travelers, travel_date, message, source_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        full_name, email, phone || '', package_name || '',
        travelers || 1, travel_date || '', message || '',
        source_url || '',
      ],
    });

    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
