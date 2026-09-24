import { fileURLToPath } from "url";
import path from "path";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { COMPANY } from "../config/company.js";
import type { InspectionWithMedia } from "../types/database.js";

const LOGO_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../logo-lh.png",
);

/**
 * PDF report matching `mockup/report_format.pdf`. This is a working scaffold:
 * cover + observations + media pages with the right structure and every-page
 * header/footer. Fine-tune spacing/typography against the mockup before launch.
 */

const styles = StyleSheet.create({
  page: { paddingTop: 64, paddingBottom: 48, paddingHorizontal: 40, fontSize: 10, color: "#1a1a1a" },
  header: { position: "absolute", top: 24, left: 40, right: 40, fontSize: 8, color: "#555" },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#555",
  },
  companyHeader: { textAlign: "right", fontSize: 9, color: "#333", marginBottom: 8 },
  rule: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 16 },
  detailRow: { flexDirection: "row", marginBottom: 4 },
  detailLabel: { width: 120, color: "#666" },
  body: { fontStyle: "italic", lineHeight: 1.5, marginTop: 16, marginBottom: 12 },
  link: { color: COMPANY.bannerBlue, textDecoration: "underline" },
  banner: {
    backgroundColor: COMPANY.bannerBlue,
    color: "#fff",
    padding: 6,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 12,
  },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  cell: { padding: 4, borderRightWidth: 1, borderRightColor: "#eee" },
  disclaimer: { marginTop: 16, fontSize: 8, color: "#777", lineHeight: 1.4 },
  mediaGrid: { flexDirection: "row", flexWrap: "wrap" },
  mediaItem: { width: "50%", padding: 4 },
  mediaImage: { width: "100%", height: 160, objectFit: "cover" },
  caption: { fontSize: 8, color: "#555", marginTop: 2 },
});

function PageChrome({ address }: { address: string }) {
  return (
    <>
      <View style={styles.header} fixed>
        <Text>Address of Premises: {address}</Text>
      </View>
      <View style={styles.footer} fixed>
        <Text>{COMPANY.footer}</Text>
        <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text>{value ?? ""}</Text>
    </View>
  );
}

/** `signedPhotos` maps photo id -> short-lived signed URL for embedding. */
export interface ReportData {
  inspection: InspectionWithMedia;
  galleryUrl: string;
  signedPhotos: Record<string, string>;
}

function ReportDocument({ inspection, galleryUrl, signedPhotos }: ReportData) {
  const address = inspection.property_address;
  const typeLabel =
    inspection.inspection_type === "incoming" ? "Incoming" : "Outgoing";

  return (
    <Document>
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <PageChrome address={address} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <Image src={LOGO_PATH} style={{ width: 120, height: 40, objectFit: "contain" }} />
          <View style={styles.companyHeader}>
            <Text>{COMPANY.name}</Text>
            <Text>{COMPANY.address}</Text>
            <Text>{COMPANY.phone}</Text>
            <Text>{COMPANY.email}</Text>
          </View>
        </View>
        <View style={styles.rule} />
        <Text style={styles.title}>{typeLabel} Inspection Report</Text>

        <Detail label="Address" value={address} />
        <Detail label="Owner Name" value={inspection.owner_name} />
        <Detail label="Tenant Name" value={inspection.tenant_name} />
        <Detail label="Inspection Date" value={inspection.inspection_date} />

        <Text style={styles.body}>
          Please find enclosed the {typeLabel.toLowerCase()} inspection report for the
          above premises.
        </Text>
        <Text>
          View your photos/videos online via{" "}
          <Text style={styles.link}>Gallery Link</Text> ({galleryUrl})
        </Text>
        <Text style={{ marginTop: 24 }}>Regards,</Text>
        <Text>{COMPANY.signatory}</Text>
      </Page>

      {/* Observations page */}
      <Page size="A4" style={styles.page}>
        <PageChrome address={address} />
        <Text style={styles.banner}>Detailed Observations From This Inspection</Text>
        <View style={[styles.tableRow, { backgroundColor: "#f2f2f2" }]}>
          {["Area of Property", "Clean", "Undamaged", "Working", "Maintenance", "Notes"].map(
            (h) => (
              <Text key={h} style={[styles.cell, { flex: h === "Area of Property" ? 2 : 1 }]}>
                {h}
              </Text>
            ),
          )}
        </View>
        {inspection.rooms.map((room) => (
          <View key={room.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{room.name}</Text>
            <Text style={[styles.cell, { flex: 1 }]} />
            <Text style={[styles.cell, { flex: 1 }]} />
            <Text style={[styles.cell, { flex: 1 }]} />
            <Text style={[styles.cell, { flex: 1 }]} />
            <Text style={[styles.cell, { flex: 1 }]} />
          </View>
        ))}
        <Text style={styles.disclaimer}>
          This report is a photographic record of the condition of the premises at the
          time of inspection and should be read in conjunction with the attached media.
        </Text>
      </Page>

      {/* Media pages */}
      <Page size="A4" style={styles.page} wrap>
        <PageChrome address={address} />
        <Text style={styles.banner}>Media</Text>
        {inspection.rooms.map((room) => (
          <View key={room.id} wrap>
            <Text style={{ fontWeight: 700, marginTop: 8, marginBottom: 4 }}>
              {room.name}
            </Text>
            <View style={styles.mediaGrid}>
              {room.photos.map((photo) => {
                const url = signedPhotos[photo.id];
                const taken = new Date(photo.taken_at);
                const stamp = `${taken.toLocaleDateString("en-AU")} - ${taken.toLocaleTimeString(
                  "en-AU",
                  { hour: "2-digit", minute: "2-digit" },
                )}`;
                return (
                  <View key={photo.id} style={styles.mediaItem} wrap={false}>
                    {url ? <Image style={styles.mediaImage} src={url} /> : null}
                    <Text style={styles.caption}>{room.name} :</Text>
                    <Text style={styles.caption}>Photo: Taken: {stamp}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

/** Render the report to a PDF Buffer for storage/emailing. */
export function renderReport(data: ReportData): Promise<Buffer> {
  return renderToBuffer(<ReportDocument {...data} />);
}
