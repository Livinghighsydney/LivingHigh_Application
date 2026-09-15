/**
 * Living High company constants used on the PDF report and in emails.
 *
 * Sourced from `mockup/report_format.pdf`. CLAUDE.md flags these as
 * "confirm before launch" — keep them here in one place so a single edit
 * updates the cover page, footer and email signature everywhere.
 */
export const COMPANY = {
  name: "Living High Pty Ltd",
  address: "200 Infinity Loop, Perth New South Wales 6000",
  phone: "0421189546",
  email: "Sophia@livinghigh.com.au",
  signatory: "Sophia Russell",
  /** Footer text shown on every PDF page (left side). */
  footer: "Living High Pty Ltd",
  /** Report banner accent colour. */
  bannerBlue: "#1F5C8B",
} as const;

export type Company = typeof COMPANY;
