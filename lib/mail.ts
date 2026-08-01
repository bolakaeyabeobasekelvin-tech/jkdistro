import nodemailer from 'nodemailer';

function getSiteEmail() {
  return process.env.SITE_EMAIL || process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';
}

function getTransporter() {
  const host = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com';
  const port = parseInt(process.env.ZOHO_MAIL_PORT || '465', 10);
  const user = process.env.ZOHO_MAIL_USER || 'contact@jkdistro.com';
  const pass = process.env.ZOHO_MAIL_PASSWORD;

  if (!pass) {
    console.warn('ZOHO_MAIL_PASSWORD environment variable is not defined. Email dispatch will fail unless configured on Vercel.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for 587
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
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
  const recipientEmail = getSiteEmail();

  const mailOptions = {
    from: `"JK Distro Contact Form" <${senderUser}>`,
    to: recipientEmail,
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
  const recipientEmail = getSiteEmail();

  const adminMail = transporter.sendMail({
    from: `"JK Distro Newsletter" <${senderUser}>`,
    to: recipientEmail,
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
  const recipientEmail = getSiteEmail();

  const itemsListText = order.cart
    .map((item) => `- ${item.title} ${item.variantTitle ? `(${item.variantTitle})` : ''} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const itemsListHtml = order.cart
    .map(
      (item) =>
        `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.title} ${item.variantTitle ? `<br/><small style="color:#6b7280;">Option: ${item.variantTitle}</small>` : ''}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  // 1. Send Admin Order Notification
  const adminMailOptions = {
    from: `"JK Distro WooCommerce Orders" <${senderUser}>`,
    to: recipientEmail,
    replyTo: order.email,
    subject: `[NEW ORDER] #${order.orderId} - $${order.grandTotal.toFixed(2)} (${order.fullName})`,
    text: `New WooCommerce Order #${order.orderId} received!\n\nCustomer: ${order.fullName}\nEmail: ${order.email}\nPhone: ${order.phone}\nShipping Address: ${order.address}, ${order.city}, ${order.state} ${order.zip}\nPayment Method: ${order.paymentMethod}\nShipping Method: ${order.shippingMethod}\n\nItems:\n${itemsListText}\n\nSubtotal: $${order.subtotal.toFixed(2)}\nShipping: $${order.shippingCost.toFixed(2)}\nGrand Total: $${order.grandTotal.toFixed(2)}\n\nOrder Notes: ${order.orderNotes || 'None'}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #111827; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
        <div style="background-color: #111827; padding: 16px 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: #ffffff; text-transform: uppercase; margin: 0; font-size: 20px; letter-spacing: 1px;">🛒 New WooCommerce Order #${order.orderId}</h2>
        </div>
        
        <div style="padding: 20px 0;">
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 24px;">
            <h3 style="margin-top: 0; color: #dc2626; font-size: 14px; text-transform: uppercase;">Customer Billing & Delivery Details</h3>
            <p style="margin: 4px 0;"><strong>Customer Name:</strong> ${order.fullName}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${order.email}" style="color: #dc2626;">${order.email}</a></p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${order.phone}</p>
            <p style="margin: 4px 0;"><strong>Shipping Address:</strong> ${order.address}, ${order.city}, ${order.state} ${order.zip}</p>
            <p style="margin: 4px 0;"><strong>Payment Method:</strong> <span style="text-transform: uppercase; font-weight: bold; color: #059669;">${order.paymentMethod}</span></p>
            <p style="margin: 4px 0;"><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
            ${order.orderNotes ? `<p style="margin: 4px 0;"><strong>Order Notes:</strong> ${order.orderNotes}</p>` : ''}
          </div>

          <h3 style="font-size: 16px; margin-bottom: 12px; text-transform: uppercase; border-bottom: 2px solid #f3f4f6; padding-bottom: 6px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <thead>
              <tr style="background-color: #f3f4f6; text-align: left; font-size: 12px; text-transform: uppercase;">
                <th style="padding: 10px;">Item</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsListHtml}
            </tbody>
          </table>

          <div style="text-align: right; font-size: 14px; background: #f9fafb; padding: 16px; border-radius: 8px;">
            <p style="margin: 4px 0; color: #4b5563;">Subtotal: <strong>$${order.subtotal.toFixed(2)}</strong></p>
            <p style="margin: 4px 0; color: #4b5563;">Shipping: <strong>$${order.shippingCost.toFixed(2)}</strong></p>
            <h2 style="color: #dc2626; margin: 8px 0 0 0; font-size: 22px;">Grand Total: $${order.grandTotal.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    `,
  };

  const adminResult = await transporter.sendMail(adminMailOptions);
  console.log(`Order notification email successfully sent to admin (${recipientEmail}) for #${order.orderId}`);

  // 2. Safely attempt customer confirmation email
  try {
    const customerMailOptions = {
      from: `"JK Distro Shop" <${senderUser}>`,
      to: order.email,
      subject: `Order Confirmation #${order.orderId} - JK Distro Shop`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #111827; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #dc2626; text-transform: uppercase; margin-top: 0;">Order Received #${order.orderId}</h2>
          <p>Hi <strong>${order.fullName}</strong>,</p>
          <p>Thank you for shopping with <strong>JK Distro Shop</strong>! We have received your order request.</p>
          <p>A representative will contact you shortly with direct payment handle details for <strong>${order.paymentMethod.toUpperCase()}</strong>.</p>
          
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #111827; text-transform: uppercase; font-size: 12px;">Shipping Address:</h4>
            <p style="margin: 2px 0;">${order.fullName}</p>
            <p style="margin: 2px 0;">${order.address}</p>
            <p style="margin: 2px 0;">${order.city}, ${order.state} ${order.zip}</p>
          </div>

          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <thead>
              <tr style="background-color: #f3f4f6; text-align: left; font-size: 12px; text-transform: uppercase;">
                <th style="padding: 8px;">Item</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsListHtml}
            </tbody>
          </table>

          <div style="text-align: right; font-size: 14px; background: #f9fafb; padding: 12px; border-radius: 8px;">
            <p style="margin: 4px 0;">Subtotal: <strong>$${order.subtotal.toFixed(2)}</strong></p>
            <p style="margin: 4px 0;">Shipping: <strong>$${order.shippingCost.toFixed(2)}</strong></p>
            <h3 style="color: #dc2626; margin: 6px 0 0 0;">Total: $${order.grandTotal.toFixed(2)}</h3>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 30px; text-align: center;">
            If you have any questions, please reply to this email or contact us at <a href="mailto:${recipientEmail}" style="color: #dc2626;">${recipientEmail}</a>.
          </p>
        </div>
      `,
    };
    await transporter.sendMail(customerMailOptions);
    console.log(`Customer confirmation email successfully sent to ${order.email}`);
  } catch (custErr) {
    console.warn(`Note: Could not deliver customer confirmation email to ${order.email}:`, custErr);
  }

  return adminResult;
}

