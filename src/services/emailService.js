const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendNotification(userEmail, productId, viewCount) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Product Viewed Multiple Times',
        html: `
          <h2>Product Viewing Notification</h2>
          <p>You've viewed product ${productId} ${viewCount} times.</p>
          <p>Click <a href="${process.env.FRONTEND_URL}/products/${productId}">here</a> to view it again!</p>
          <p>Happy shopping!</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email notification sent to ${userEmail} for product ${productId}`);
    } catch (error) {
      logger.error('Error sending email notification:', error);
      throw error;
    }
  }

  async sendViewMilestoneNotification(userEmail, productId, viewCount) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Product View Milestone Reached!',
        html: `
          <h2>Milestone Achievement!</h2>
          <p>Congratulations! You've reached a milestone by viewing product ${productId} ${viewCount} times.</p>
          <p>This might be a product you're really interested in!</p>
          <p>Click <a href="${process.env.FRONTEND_URL}/products/${productId}">here</a> to view it again!</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Milestone email notification sent to ${userEmail} for product ${productId}`);
    } catch (error) {
      logger.error('Error sending milestone email notification:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();