import sendGrid from '@sendgrid/mail';
import { ContactInfo } from '@/models';

export async function onContactFormSubmit(contactInfo: ContactInfo) {
  if (process.env.SENDGRID_API_KEY) {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  } else {
    console.warn('SendGrid API key not set!');
  }
  return sendGrid.send({
    to: process.env.SENDGRID_CONTACT_FORM_TO_EMAIL,
    from: process.env.SENDGRID_CONTACT_FORM_FROM_EMAIL || '',
    subject: 'Blood Destiny - ' + contactInfo.inquiryType,
    html: `
      <div>
        <p>You have received the following message from ${contactInfo.name} (${contactInfo.email})</p>
        <p>${contactInfo.message}</p>
      </div>
    `
  });
}
