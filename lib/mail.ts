import nodemailer from 'nodemailer';

const SITE_EMAIL = 'contact@jkdistroshop.com';

function getTransporter() {
  const host = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com';
  const port = parseInt(process.env.ZOHO_MAIL_PORT || '465', 10);
  const user = process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';
  const pass = process.env.ZOHO_MAIL_PASSWORD;

  if (!pass) {
    console.warn('ZOHO_MAIL_PASSWORD environment variable is not defined. Email dispatch might fail.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const transporter = getTransporter();
  const senderUser = process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';

  const mailOptions = {
    from: `"JK Distro Contact Form" <${senderUser}>`,
    to: SITE_EMAIL,
    replyTo: email,
    subject: `New Contact Submission: ${subject || 'Inquiry from ' + name}`,
    text: `New contact form submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'General Inquiry'}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
        <h2 style="color: #dc2626; text-transform: uppercase;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; margin: 0;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendNewsletterEmail(subscriberEmail: string) {
  const transporter = getTransporter();
  const senderUser = process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';

  // Email to admin
  const adminMail = transporter.sendMail({
    from: `"JK Distro Newsletter" <${senderUser}>`,
    to: SITE_EMAIL,
    subject: `New Newsletter Subscriber: ${subscriberEmail}`,
    text: `A new user subscribed to the newsletter:\n\nEmail: ${subscriberEmail}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
        <h2 style="color: #dc2626; text-transform: uppercase;">New Newsletter Subscription</h2>
        <p>Subscriber Email: <strong>${subscriberEmail}</strong></p>
      </div>
    `,
  });

  return await adminMail;
}

export async function sendOrderNotificationEmail(order: {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: string;
  shippingMethod: string;
  cart: Array<{ title: string; variantTitle?: string; price: number; quantity: number }>;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  orderNotes?: string;
}) {
  const transporter = getTransporter();
  const senderUser = process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';

  const itemsListText = order.cart
    .map((item) => `- ${item.title} ${item.variantTitle ? `(${item.variantTitle})` : ''} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const itemsListHtml = order.cart
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.title} ${item.variantTitle ? `<br/><small style="color:#666;">Option: ${item.variantTitle}</small>` : ''}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  // 1. Email to store team
  const adminMail = transporter.sendMail({
    from: `"JK Distro Orders" <${senderUser}>`,
    to: SITE_EMAIL,
    replyTo: order.email,
    subject: `[NEW ORDER] #${order.orderId} - $${order.grandTotal.toFixed(2)} (${order.fullName})`,
    text: `New order #${order.orderId} received!\n\nCustomer: ${order.fullName}\nEmail: ${order.email}\nPhone: ${order.phone}\nShipping Address: ${order.address}, ${order.city}, ${order.state} ${order.zip}\nPayment Method: ${order.paymentMethod}\nShipping Method: ${order.shippingMethod}\n\nItems:\n${itemsListText}\n\nSubtotal: $${order.subtotal.toFixed(2)}\nShipping: $${order.shippingCost.toFixed(2)}\nGrand Total: $${order.grandTotal.toFixed(2)}\n\nOrder Notes: ${order.orderNotes || 'None'}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626; text-transform: uppercase;">New Order Received #${order.orderId}</h2>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Customer:</strong> ${order.fullName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Shipping Address:</strong> ${order.address}, ${order.city}, ${order.state} ${order.zip}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Shipping Mode:</strong> ${order.shippingMethod}</p>
          ${order.orderNotes ? `<p><strong>Order Notes:</strong> ${order.orderNotes}</p>` : ''}
        </div>
        <h3>Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #eee; text-align: left;">
              <th style="padding: 8px;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
        </table>
        <div style="text-align: right; font-size: 14px;">
          <p>Subtotal: <strong>$${order.subtotal.toFixed(2)}</strong></p>
          <p>Shipping: <strong>$${order.shippingCost.toFixed(2)}</strong></p>
          <h3 style="color: #dc2626; margin-top: 5px;">Grand Total: $${order.grandTotal.toFixed(2)}</h3>
        </div>
      </div>
    `,
  });

  // 2. Confirmation email to customer
  const customerMail = transporter.sendMail({
    from: `"JK Distro Shop" <${senderUser}>`,
    to: order.email,
    subject: `Order Received #${order.orderId} - JK Distro Shop`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626; text-transform: uppercase;">Order Confirmation #${order.orderId}</h2>
        <p>Hi ${order.fullName},</p>
        <p>Thank you for your order with JK Distro Shop! Our sales team has received your order request and will reach out shortly with payment details (${order.paymentMethod.toUpperCase()}).</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0;">Shipping To:</h4>
          <p style="margin: 0;">${order.fullName}</p>
          <p style="margin: 0;">${order.address}</p>
          <p style="margin: 0;">${order.city}, ${order.state} ${order.zip}</p>
        </div>

        <h3>Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #eee; text-align: left;">
              <th style="padding: 8px;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
        </table>

        <div style="text-align: right; font-size: 14px;">
          <p>Subtotal: <strong>$${order.subtotal.toFixed(2)}</strong></p>
          <p>Shipping: <strong>$${order.shippingCost.toFixed(2)}</strong></p>
          <h3 style="color: #dc2626; margin-top: 5px;">Total: $${order.grandTotal.toFixed(2)}</h3>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
          If you have any questions, please reply to this email or contact us at <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>.
        </p>
      </div>
    `,
  });

  return await Promise.all([adminMail, customerMail]);
}
