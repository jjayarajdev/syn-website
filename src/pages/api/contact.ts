import type { APIRoute } from 'astro';
// @ts-ignore — virtual module provided by the Cloudflare Workers runtime
import { env } from 'cloudflare:workers';

export const prerender = false;

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
  website?: string; // honeypot — real users never fill this
}

const MAX = { name: 100, email: 254, company: 200, interest: 50, message: 5000 };

function bad(status: number, error: string) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return bad(400, 'Invalid request body.');
  }

  // Honeypot: pretend success so bots learn nothing
  if (data.website) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const firstName = data.firstName?.trim() ?? '';
  const lastName = data.lastName?.trim() ?? '';
  const email = data.email?.trim() ?? '';

  if (!firstName || !lastName || !email) {
    return bad(400, 'First name, last name and email are required.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad(400, 'Please enter a valid email address.');
  }
  if (
    firstName.length > MAX.name ||
    lastName.length > MAX.name ||
    email.length > MAX.email ||
    (data.company ?? '').length > MAX.company ||
    (data.interest ?? '').length > MAX.interest ||
    (data.message ?? '').length > MAX.message
  ) {
    return bad(400, 'One of the fields is too long.');
  }

  const db = (env as any)?.DB;
  if (!db) {
    // Dev server or misconfigured binding — never pretend it worked
    return bad(503, 'Submissions are temporarily unavailable. Please email us directly.');
  }

  try {
    await db.prepare(
      `INSERT INTO contact_submissions
         (first_name, last_name, email, company, interest, message, user_agent, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        firstName,
        lastName,
        email,
        data.company?.trim() || null,
        data.interest || null,
        data.message?.trim() || null,
        request.headers.get('user-agent'),
        (request as any).cf?.country ?? request.headers.get('cf-ipcountry')
      )
      .run();
  } catch (err) {
    console.error('contact_submissions insert failed:', err);
    return bad(500, 'Something went wrong saving your message. Please email us directly.');
  }

  // Email alert — best-effort: a mail failure must never fail the submission
  const apiKey = (env as any)?.RESEND_API_KEY;
  if (apiKey) {
    try {
      const esc = (s: string | null | undefined) =>
        (s ?? '—').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: (env as any)?.ALERT_FROM || 'Syntegreti Website <onboarding@resend.dev>',
          to: [(env as any)?.ALERT_TO || 'jay.jayakeerthy@syntegreti.com'],
          reply_to: email,
          subject: `New website lead: ${firstName} ${lastName}${data.company ? ' — ' + data.company.trim() : ''}`,
          html: `
            <h2 style="margin:0 0 12px">New contact form submission</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
              <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${esc(firstName)} ${esc(lastName)}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${esc(email)}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td>${esc(data.company)}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Interest</td><td>${esc(data.interest)}</td></tr>
              <tr><td style="padding:4px 12px 4px 0;color:#666">Country</td><td>${esc((request as any).cf?.country ?? request.headers.get('cf-ipcountry'))}</td></tr>
            </table>
            <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>
            <p style="font-family:sans-serif;font-size:12px;color:#999">Stored in D1 · reply goes straight to the sender</p>`,
        }),
      });
      if (!res.ok) console.error('resend alert failed:', res.status, await res.text());
    } catch (err) {
      console.error('resend alert failed:', err);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
