'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Status / Tracking');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;

    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMsg('Thank you! Your message has been received by our sales team and sent via Zoho Mail.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMsg('A network error occurred. Please try again or email contact@jkdistroshop.com directly.');
    }
  };

  return (
    <div className="bg-neutral-50 p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm relative">
      <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-6">
        Send a Message
      </h3>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-start gap-3 text-xs font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-emerald-950 mb-0.5">Message Sent Successfully</p>
            <p>{responseMsg}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-start gap-3 text-xs font-medium">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-red-950 mb-0.5">Submission Error</p>
            <p>{responseMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium"
              placeholder="Jane"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
            Subject *
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium text-neutral-800"
          >
            <option value="Order Status / Tracking">Order Status / Tracking</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Wholesale Application">Wholesale Application</option>
            <option value="General Questions">General Questions</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wide">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-shadow text-xs font-medium resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-red-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-red-700 transition-colors shadow-md mt-2 flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? (
            'Sending via Zoho Mail...'
          ) : (
            <>
              Send Message <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
