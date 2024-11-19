const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-id' });

const mockTransporter = {
  sendMail: mockSendMail
};

const nodemailerMock = {
  createTransport: jest.fn().mockReturnValue(mockTransporter)
};

module.exports = nodemailerMock;