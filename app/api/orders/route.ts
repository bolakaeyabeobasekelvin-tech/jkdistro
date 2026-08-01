import { NextResponse } from 'next/server';
import { sendOrderNotificationEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      orderId,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      paymentMethod,
      shippingMethod,
      cart,
      subtotal,
      shippingCost,
      grandTotal,
      orderNotes,
    } = data;

    if (!orderId || !fullName || !email || !cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order fields' },
        { status: 400 }
      );
    }

    await sendOrderNotificationEmail({
      orderId,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      paymentMethod,
      shippingMethod,
      cart,
      subtotal,
      shippingCost,
      grandTotal,
      orderNotes,
    });

    console.log(`Order notification #${orderId} successfully dispatched via Zoho Mail SMTP`);

    return NextResponse.json(
      { success: true, orderId, message: 'Order submitted and email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { error: 'Failed to process order email notification' },
      { status: 500 }
    );
  }
}
