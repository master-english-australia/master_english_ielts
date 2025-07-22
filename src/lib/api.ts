export type SendEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendEmail(payload: SendEmailPayload) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to send email');
  }

  return data;
}