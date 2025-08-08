// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, subject, message, attachments } = body;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  const requiredValueMap = {
    name: name,
    subject: subject,
    message: message,
    fromEmail: fromEmail,
    toEmail: toEmail,
  };

  if (Object.values(requiredValueMap).some((value) => !value)) {
    const missingFields = Object.entries(requiredValueMap).filter(
      ([key, value]) => !value,
    );
    console.log("missingFields", missingFields);
    return NextResponse.json(
      { error: "Missing fields: " + missingFields.join(", ") },
      { status: 400 },
    );
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail || "",
      to: toEmail || "",
      subject: "Submitted by " + name + "-" + subject,
      html: `<p>${message}</p>`,
      attachments: Array.isArray(attachments)
        ? attachments.map((a: any) => ({
            filename: a.filename,
            content: a.content,
            contentType: a.contentType || "audio/webm",
          }))
        : undefined,
    });

    if (data.error) {
      console.log("data.error", data.error);
      return NextResponse.json(
        { success: false, error: data.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
