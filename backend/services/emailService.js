const { Resend } = require('resend');
const logger = require('../utils/logger');

// Helper to sanitize FRONTEND_URL and pick a single valid base URL
function getFrontendBaseUrl() {
  const raw = process.env.FRONTEND_URL || 'http://localhost:5173';
  const candidates = raw.split(',').map(s => s.trim()).filter(Boolean);
  // Prefer app subdomain if present
  let preferred = candidates.find(u => /app\./i.test(u)) || candidates[0] || 'http://localhost:5173';
  // Ensure scheme exists and fix malformed 'https//'
  if (!/^https?:\/\//i.test(preferred)) {
    preferred = `https://${preferred.replace(/^https?\/?\/\/?/i, '')}`;
  }
  preferred = preferred.replace(/^https\/?\//i, 'https://').replace(/^http\/?\//i, 'http://');
  // Remove trailing slashes
  return preferred.replace(/\/+$/, '');
}

class EmailService {
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  }

  /**
   * Send verification email
   * @param {String} email - User email
   * @param {String} firstName - User first name
   * @param {String} verificationToken - Verification token
   */
  async sendVerificationEmail(email, firstName, verificationToken) {
    try {
      const baseUrl = getFrontendBaseUrl();
      const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: [email],
        subject: 'Verify Your Email - Daddy Leads',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #14F195, #00D4FF, #9945FF); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .logo { width: 60px; height: 60px; background: white; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 24px; color: #411c78; }
                .content { background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 14px 32px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">DL</div>
                </div>
                <div class="content">
                  <h1 style="color: #411c78; margin-bottom: 20px;">Welcome to Daddy Leads, ${firstName}!</h1>
                  <p>Thank you for signing up. We're excited to have you on board!</p>
                  <p>Please verify your email address by clicking the button below:</p>
                  <p style="color: #666; font-size: 14px;">If you don't see the email, please check your inbox or spam folder.</p>
                  <div style="text-align: center;">
                    <a href="${verificationUrl}" class="button">Verify Email Address</a>
                  </div>
                  <p style="color: #666; font-size: 14px; margin-top: 30px;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="${verificationUrl}" style="color: #6366f1; word-break: break-all;">${verificationUrl}</a>
                  </p>
                  <p style="color: #666; font-size: 14px; margin-top: 20px;">
                    This link will expire in 24 hours.
                  </p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Daddy Leads. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        logger.error('Resend email error', { error });
        throw new Error('Failed to send verification email');
      }

      logger.info('Verification email sent', { email, messageId: data?.id });
      return { success: true, messageId: data?.id };
    } catch (error) {
      logger.error('Email service error', { error: error.message });
      throw error;
    }
  }
}

module.exports = new EmailService();
