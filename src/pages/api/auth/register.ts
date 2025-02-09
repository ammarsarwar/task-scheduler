// pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save the user's details temporarily with the OTP
    await prisma.tempUser.create({
      data: {
        name,
        email,
        password, // Hash the password before saving (use bcrypt)
        otp,
      },
    });

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}