"use server";

import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";
import { type Result, resultify } from "@/lib/utils/helpers";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessage = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<Result<string>> => {
  const result = await resultify(async () =>
    resend.emails.send({
      from: "portfolio@arbikullakshi.com",
      to: "contact@arbikullakshi.com",
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    }),
  );

  const posthog = getPostHogClient();

  if (!result.success) {
    posthog.capture({
      distinctId: data.email,
      event: "contact_message_sent",
      properties: {
        success: false,
        sender_name: data.name,
        sender_email: data.email,
      },
    });
    return { success: false, error: result.error };
  }

  posthog.capture({
    distinctId: data.email,
    event: "contact_message_sent",
    properties: {
      success: true,
      sender_name: data.name,
      sender_email: data.email,
    },
  });
  posthog.identify({
    distinctId: data.email,
    properties: {
      name: data.name,
      email: data.email,
    },
  });

  return { success: true, data: "Message sent successfully" };
};
