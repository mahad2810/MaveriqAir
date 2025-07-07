// Serverless function for Vercel
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

// Import your API routes handler
import nodemailer from 'nodemailer';
import { z } from 'zod';

// In-memory storage for demo purposes
class MemStorage {
  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentId = 1;
    this.currentContactId = 1;
  }

  async createContactSubmission(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      organization: insertContact.organization || null,
      isApiRequest: insertContact.isApiRequest || false,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

const storage = new MemStorage();

// Simplified schema validation
const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  organization: z.string().optional(),
  message: z.string(),
  isApiRequest: z.boolean().optional().default(false)
});

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact form API route
app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    const submission = await storage.createContactSubmission(validatedData);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Submission - ${validatedData.isApiRequest ? 'API Request' : 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Organization:</strong> ${validatedData.organization || 'N/A'}</p>
          <p><strong>Type:</strong> ${validatedData.isApiRequest ? 'API Request' : 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `
      });
    }
    
    res.json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data',
        errors: error.errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Create HTTP server
const server = createServer(app);

// Export for Vercel
export default app; 