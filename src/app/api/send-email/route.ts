// src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: `${name} <${email}>`,
      to: 'shion.maruko.s@gmail.com',
      subject: 'Submitted by ' + name + '-' + subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
