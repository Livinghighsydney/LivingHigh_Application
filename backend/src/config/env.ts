import "dotenv/config";

/** Read a required env var, throwing a clear error if it is missing. */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  port: Number(optional("PORT", "4000")),
  frontendOrigin: optional("FRONTEND_ORIGIN", "http://localhost:3000"),
  appUrl: optional("APP_URL", "http://localhost:3000"),

  supabaseUrl: required("SUPABASE_URL"),
  supabaseServiceRoleKey: required("SUPABASE_SERVICE_ROLE_KEY"),

  resendApiKey: required("RESEND_API_KEY"),
  reportFromEmail: required("REPORT_FROM_EMAIL"),
  reportOfficeEmail: required("REPORT_OFFICE_EMAIL"),
};
