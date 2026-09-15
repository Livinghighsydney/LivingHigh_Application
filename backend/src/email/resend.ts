import { Resend } from "resend";
import { env } from "../config/env.js";
import { COMPANY } from "../config/company.js";

const resend = new Resend(env.resendApiKey);

export interface ReportEmailInput {
  /** Recipient(s). Defaults to the office inbox. */
  to?: string | string[];
  propertyAddress: string;
  pdf: Buffer;
}

/** Email the generated report PDF as an attachment. */
export async function sendReportEmail({
  to = env.reportOfficeEmail,
  propertyAddress,
  pdf,
}: ReportEmailInput) {
  const { data, error } = await resend.emails.send({
    from: env.reportFromEmail,
    to,
    subject: `Inspection Report — ${propertyAddress}`,
    text: `Please find attached the inspection report for ${propertyAddress}.\n\nRegards,\n${COMPANY.signatory}\n${COMPANY.name}`,
    attachments: [{ filename: "inspection-report.pdf", content: pdf }],
  });

  if (error) throw error;
  return data;
}
