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
  const anonymousId = crypto.randomUUID();

  posthog.capture({
    distinctId: anonymousId,
    event: "contact_message_sent",
    properties: { success: result.success },
  });

  return { success: true, data: "Message sent successfully" };
};
