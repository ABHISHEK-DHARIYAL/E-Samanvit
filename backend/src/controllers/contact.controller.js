/**
 * Contact controller.
 *
 * Responsibility: validate a "Contact Us" submission from the public
 * frontend and deliver it by email via Resend, so a real inbox
 * receives what the citizen typed instead of it disappearing into a
 * frontend-only mock. Contains no email-provider-specific logic beyond
 * the raw Resend API call — swapping providers later only touches
 * this file.
 */
const config = require('../config/env');
const { ContactValidationError, EmailDeliveryError } = require('../utils/errors');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateContactBody(body) {
  const { name, email, subject, message } = body || {};
  const fieldErrors = {};

  if (!name || !String(name).trim()) fieldErrors.name = 'Full name is required';
  if (!email || !EMAIL_RE.test(String(email).trim())) fieldErrors.email = 'A valid email address is required';
  if (!subject || !String(subject).trim()) fieldErrors.subject = 'Please select a service subject';
  if (!message || !String(message).trim()) fieldErrors.message = 'Please write your message or inquiry';

  if (Object.keys(fieldErrors).length > 0) {
    throw new ContactValidationError(fieldErrors);
  }
}

async function sendContactEmail({ name, email, phone, subject, message }) {
  if (!config.resendApiKey) {
    throw new EmailDeliveryError('Email service is not configured (missing RESEND_API_KEY)');
  }

  const html = `
    <h2>New contact form submission — e-Samanvit</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: config.contactFromEmail,
      to: config.contactToEmail,
      reply_to: email,
      subject: `[e-Samanvit Contact] ${subject} — ${name}`,
      html
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new EmailDeliveryError(`Resend rejected the message (status ${response.status}): ${body.slice(0, 200)}`);
  }
}

async function submitContact(req, res) {
  validateContactBody(req.body);

  const { name, email, phone, subject, message } = req.body;
  await sendContactEmail({ name, email, phone, subject, message });

  const reference = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
  res.status(200).json({ success: true, reference });
}

module.exports = { submitContact };
