import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import sendEmail from "../utils/sendEmail";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe.skip("sendEmail", () => {
  const mockSendMail = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    mockedNodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail,
    } as any);

    process.env.EMAIL_SERVICE = "gmail";
    process.env.EMAIL_USERNAME = "test@example.com";
    process.env.EMAIL_PASSWORD = "testpassword";
    process.env.FROM_NAME = "Test App";
    process.env.FROM_EMAIL = "noreply@testapp.com";
  });

  it("should create transporter with correct config", async () => {
    const options = {
      email: "recipient@example.com",
      subject: "Test Subject",
      message: "Test message content",
    };

    await sendEmail(options);

    expect(mockedNodemailer.createTransport).toHaveBeenCalledWith({
      service: "gmail",
      auth: {
        user: "test@example.com",
        pass: "testpassword",
      },
    });
  });
  it("should call sendMail with correct options", async () => {
    const options = {
      email: "recipient@example.com",
      subject: "Test Subject",
      message: "Test message content",
    };
    await sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({
      from: "Test App <noreply@testapp.com>",
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test message content",
    });
  });
});
