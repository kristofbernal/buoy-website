import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify({ email, userGroup: 'waitlist' }),
  });

  if (res.ok) {
    return NextResponse.json({ success: true });
  } else {
    const error = await res.json();
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
