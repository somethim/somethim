"use server";

import { type Result, resultify } from "@zenncore/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessage = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<Result<string>> => {
  const result = await resultify(async () =>
    resend.emails.send({
      from: "hello@mariovukzaj.com",
      to: "vukzajmario5@gmail.com",
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    }),
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, data: "Message sent successfully" };
};
