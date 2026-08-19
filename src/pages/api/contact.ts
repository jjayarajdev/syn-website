import type { APIRoute } from 'astro';

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

export const POST: APIRoute = async ({ request, locals }) => {
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

  const env = (locals as any).runtime?.env;
  if (!env?.DB) {
    // Dev server or misconfigured binding — never pretend it worked
    return bad(503, 'Submissions are temporarily unavailable. Please email us directly.');
  }

  try {
    await env.DB.prepare(
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

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
