jest.mock('nodemailer', () => require('../../mocks/nodemailer'));
const emailService = require('../../../src/services/emailService');
const { validUser } = require('../../fixtures/users');
const { validProduct } = require('../../fixtures/products');

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendNotification', () => {
    test('should send email notification successfully', async () => {
      const result = await emailService.sendNotification(
        validUser.email,
        validProduct.id,
        3
      );

      expect(result).toBeTruthy();
    });

    test('should handle email sending errors', async () => {
      const error = new Error('Email failed');
      const nodemailer = require('nodemailer');
      nodemailer.createTransport().sendMail.mockRejectedValueOnce(error);

      await expect(
        emailService.sendNotification(validUser.email, validProduct.id, 3)
      ).rejects.toThrow('Email failed');
    });
  });
});