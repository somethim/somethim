"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(100),
  message: z.string().trim().min(20).max(5_000),
  website: z.string().max(0),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMilliseconds = 15 * 60 * 1_000;
const maximumAttempts = 3;
const cleanupInterval = 100;
let requestCount = 0;

export type ContactState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Partial<Record<"name" | "email" | "company" | "message", string[]>>;
};

const getClientAddress = async (): Promise<string> => {
  const requestHeaders = await headers();
  const cloudflareAddress = requestHeaders.get("cf-connecting-ip");
  if (cloudflareAddress) return cloudflareAddress;

  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
};

const isRateLimited = async (): Promise<boolean> => {
  const now = Date.now();
  const address = await getClientAddress();
  requestCount += 1;

  if (requestCount % cleanupInterval === 0)
    for (const [key, attempt] of attempts)
      if (attempt.resetAt <= now) attempts.delete(key);

  const current = attempts.get(address);

  if (!current || current.resetAt <= now) {
    attempts.set(address, { count: 1, resetAt: now + windowMilliseconds });
    return false;
  }

  if (current.count >= maximumAttempts) return true;

  attempts.set(address, { ...current, count: current.count + 1 });
  return false;
};

export const sendContactMessage = async (
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> => {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      errors: {
        name: errors.name,
        email: errors.email,
        company: errors.company,
        message: errors.message,
      },
    };
  }

  if (await isRateLimited())
    return {
      status: "error",
      message:
        "Too many messages were sent from this connection. Try again later.",
    };

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error(
      "Contact form is unavailable: RESEND_API_KEY is not configured.",
    );
    return {
      status: "error",
      message:
        "The mail service is temporarily unavailable. Please email me directly.",
    };
  }

  const { name, email, company, message } = parsed.data;
  const safeName = name.replace(/[\r\n]+/g, " ");
  const resend = new Resend(apiKey);
  const result = await resend.emails
    .send({
      from: "Arbi Kullakshi Portfolio <portfolio@arbikullakshi.com>",
      to: "contact@arbikullakshi.com",
      replyTo: email,
      subject: `Portfolio inquiry from ${safeName}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        "",
        message,
      ].join("\n"),
    })
    .catch((error: unknown) => {
      console.error("Resend contact request failed:", error);
      return null;
    });

  if (!result || result.error) {
    if (result?.error)
      console.error(
        "Resend rejected a portfolio contact message:",
        result.error.name,
      );
    return {
      status: "error",
      message: "The message could not be delivered. Please email me directly.",
    };
  }

  return {
    status: "success",
    message: "Message sent. I’ll get back to you as soon as I can.",
  };
};
