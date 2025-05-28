import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    if (process.env.NODE_ENV === 'development') {
      // Use Ethereal for development
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'ethereal.user@ethereal.email',
          pass: 'ethereal.pass'
        }
      });
    }

    // Production transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendEmail(options) {
    try {
      // Define email options
      const mailOptions = {
        from: `InfinitiFlow <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        html: this.generateHTML(options.template, options.data),
        text: this.generateText(options.template, options.data)
      };

      // Send the email
      const info = await this.transporter.sendMail(mailOptions);
      
      logger.info(`Email sent successfully to ${options.email}`, {
        messageId: info.messageId,
        template: options.template
      });

      return info;
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw error;
    }
  }

  generateHTML(template, data) {
    const templates = {
      emailVerification: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - InfinitiFlow</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #020043; font-size: 24px; font-weight: bold; }
            .button { display: inline-block; padding: 12px 30px; background-color: #020043; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">InfinitiFlow</div>
            </div>
            <h2>Welcome to InfinitiFlow, ${data.firstName}!</h2>
            <p>Thank you for signing up for InfinitiFlow. To complete your registration and start generating amazing AI content, please verify your email address.</p>
            <div style="text-align: center;">
              <a href="${data.verifyURL}" class="button">Verify Email Address</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${data.verifyURL}</p>
            <p>This link will expire in 24 hours for security reasons.</p>
            <div class="footer">
              <p>If you didn't create an account with InfinitiFlow, you can safely ignore this email.</p>
              <p>&copy; 2024 InfinitiFlow. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,

      passwordReset: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - InfinitiFlow</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #020043; font-size: 24px; font-weight: bold; }
            .button { display: inline-block; padding: 12px 30px; background-color: #020043; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
            .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">InfinitiFlow</div>
            </div>
            <h2>Password Reset Request</h2>
            <p>Hi ${data.firstName},</p>
            <p>We received a request to reset your password for your InfinitiFlow account. If you made this request, click the button below to reset your password:</p>
            <div style="text-align: center;">
              <a href="${data.resetURL}" class="button">Reset Password</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${data.resetURL}</p>
            <div class="warning">
              <strong>Security Notice:</strong> This link will expire in 10 minutes for security reasons.
            </div>
            <div class="footer">
              <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
              <p>&copy; 2024 InfinitiFlow. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,

      welcome: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to InfinitiFlow!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #020043; font-size: 24px; font-weight: bold; }
            .button { display: inline-block; padding: 12px 30px; background-color: #020043; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
            .features { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .feature { margin: 10px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">InfinitiFlow</div>
            </div>
            <h2>Welcome to InfinitiFlow, ${data.firstName}! 🎉</h2>
            <p>Congratulations! Your email has been verified and your account is now active. You're ready to start creating amazing AI-powered content.</p>
            
            <div class="features">
              <h3>What you can do now:</h3>
              <div class="feature">✨ Generate unlimited content with AI</div>
              <div class="feature">📝 Use 50+ professional templates</div>
              <div class="feature">🌍 Create content in multiple languages</div>
              <div class="feature">📊 Track your content performance</div>
            </div>

            <div style="text-align: center;">
              <a href="${data.dashboardURL}" class="button">Start Creating Content</a>
              <a href="${data.templatesURL}" class="button">Browse Templates</a>
            </div>

            <p>Need help getting started? Check out our <a href="${data.guideURL}">quick start guide</a> or contact our support team.</p>

            <div class="footer">
              <p>Happy creating!</p>
              <p>The InfinitiFlow Team</p>
              <p>&copy; 2024 InfinitiFlow. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    return templates[template] || `<h1>Email Template</h1><p>Template "${template}" not found.</p>`;
  }

  generateText(template, data) {
    const textTemplates = {
      emailVerification: `
Welcome to InfinitiFlow, ${data.firstName}!

Thank you for signing up for InfinitiFlow. To complete your registration and start generating amazing AI content, please verify your email address.

Verify your email: ${data.verifyURL}

This link will expire in 24 hours for security reasons.

If you didn't create an account with InfinitiFlow, you can safely ignore this email.

© 2024 InfinitiFlow. All rights reserved.
      `,

      passwordReset: `
Password Reset Request

Hi ${data.firstName},

We received a request to reset your password for your InfinitiFlow account. If you made this request, use the link below to reset your password:

Reset your password: ${data.resetURL}

Security Notice: This link will expire in 10 minutes for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

© 2024 InfinitiFlow. All rights reserved.
      `,

      welcome: `
Welcome to InfinitiFlow, ${data.firstName}! 🎉

Congratulations! Your email has been verified and your account is now active. You're ready to start creating amazing AI-powered content.

What you can do now:
• Generate unlimited content with AI
• Use 50+ professional templates  
• Create content in multiple languages
• Track your content performance

Get started: ${data.dashboardURL}
Browse templates: ${data.templatesURL}

Need help? Check out our quick start guide: ${data.guideURL}

Happy creating!
The InfinitiFlow Team

© 2024 InfinitiFlow. All rights reserved.
      `
    };

    return textTemplates[template] || `Email template "${template}" not found.`;
  }
}

// Create and export singleton instance
const emailService = new EmailService();

export const sendEmail = (options) => emailService.sendEmail(options);
export default emailService; 