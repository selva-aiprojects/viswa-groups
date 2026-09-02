const DESTINATION_EMAIL = 'contactus@viswagroups.com';

function jsonResponse(body, status = 200) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ error: 'Email service is not configured' });
  }

  const { name, contact, email, phone, interest, property_type, message, source } = request.body || {};
  const senderContact = email || contact || phone;

  if (!name || !senderContact) {
    return response.status(400).json({ error: 'Name and contact details are required' });
  }

  const subject = source === 'checklist'
    ? 'Madurai property checklist request'
    : source === 'modal'
      ? 'New brochure or consultation request'
      : 'New executive inquiry from Viswa Groups website';

  const details = [
    `Name: ${name}`,
    `Email or contact: ${senderContact}`,
    `Phone: ${phone || 'Not provided'}`,
    `Interest: ${interest || property_type || 'Not provided'}`,
    `Message: ${message || 'Not provided'}`,
    `Source: ${source || 'website'}`
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || 'Viswa Website <onboarding@resend.dev>',
        to: [DESTINATION_EMAIL],
        subject,
        text: details,
        reply_to: email || undefined
      })
    });

    if (!resendResponse.ok) {
      console.error('Resend rejected email:', await resendResponse.text());
      return response.status(502).json({ error: 'Unable to send your request right now' });
    }

    return response.status(200).json({
      success: true,
      checklist: source === 'checklist'
    });
  } catch (error) {
    console.error('Lead email error:', error);
    return response.status(502).json({ error: 'Unable to send your request right now' });
  }
};
