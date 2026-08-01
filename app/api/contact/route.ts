import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    console.log('Contact form email dispatched successfully via Zoho Mail');

    return NextResponse.json(
      { success: true, message: 'Message sent successfully via Zoho Mail' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email contact@jkdistroshop.com directly.' },
      { status: 500 }
    );
  }
}

