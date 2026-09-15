import { Router, type Request, type Response } from "express";
import { env } from "../config/env.js";
import {
  getInspectionWithMedia,
  signPhotoUrl,
  storeReport,
  signReportUrl,
} from "../services/inspections.js";
import { renderReport } from "../pdf/report.js";
import { sendReportEmail } from "../email/resend.js";

export const inspectionsRouter = Router();

/**
 * POST /api/inspections/:id/generate
 * Build the PDF, store it, email it, and return a signed download URL.
 */
inspectionsRouter.post(
  "/:id/generate",
  async (req: Request, res: Response) => {
    const id = String(req.params.id);

    try {
      const inspection = await getInspectionWithMedia(id);
      if (!inspection) {
        return res.status(404).json({ error: "Inspection not found" });
      }

      // Signed URLs for each photo so react-pdf can embed them.
      const signedPhotos: Record<string, string> = {};
      for (const room of inspection.rooms) {
        for (const photo of room.photos) {
          signedPhotos[photo.id] = await signPhotoUrl(photo.storage_path);
        }
      }

      const galleryUrl = `${env.appUrl}/gallery/${inspection.gallery_token}`;
      const pdf = await renderReport({ inspection, galleryUrl, signedPhotos });

      const { path } = await storeReport(id, pdf);

      await sendReportEmail({
        propertyAddress: inspection.property_address,
        pdf,
      });

      const downloadUrl = await signReportUrl(path);
      return res.json({ downloadUrl, galleryUrl });
    } catch (err) {
      console.error("Failed to generate report:", err);
      return res.status(500).json({ error: "Failed to generate report" });
    }
  },
);
