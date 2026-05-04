import "dotenv/config";
import { randomUUID } from "crypto";
import { hashPassword } from "better-auth/crypto";
import { eq } from "drizzle-orm";
import { getDb } from "../src/db/client";
import { account, blogs, gallery, products, teams, testimonials, user } from "../src/db/schema";

const email = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
const password = process.env.SEED_ADMIN_PASSWORD ?? "admin123change";

async function main() {
  const db = getDb();
  const existing = await db.select().from(user).where(eq(user.email, email)).limit(1);
  if (existing.length > 0) {
    console.log("Seed skipped: admin already exists.");
    return;
  }

  const uid = randomUUID();
  const hashed = await hashPassword(password);
  const now = new Date();

  await db.insert(user).values({
    id: uid,
    name: "Administrator",
    email,
    emailVerified: true,
    image: null,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: randomUUID(),
    accountId: uid,
    providerId: "credential",
    userId: uid,
    accessToken: null,
    refreshToken: null,
    idToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
    scope: null,
    password: hashed,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(products).values([
    {
      id: randomUUID(),
      nameId: "Monitor Pasien Digital",
      nameEn: "Digital Patient Monitor",
      descriptionId: "Monitor multiparameter untuk pemantauan vital di rumah sakit.",
      descriptionEn: "Multi-parameter monitor for vital signs monitoring in clinical settings.",
      imageUrl: "/placeholder-product.svg",
      category: "Monitoring",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      nameId: "Termometer Infrared",
      nameEn: "Infrared Thermometer",
      descriptionId: "Pengukuran suhu tubuh tanpa kontak, higienis dan cepat.",
      descriptionEn: "Non-contact body temperature measurement — hygienic and fast.",
      imageUrl: "/placeholder-product.svg",
      category: "Diagnostics",
      createdAt: now,
      updatedAt: now,
    },
  ]);

  await db.insert(testimonials).values({
    id: randomUUID(),
    clientName: "dr. Siti Rahayu",
    clientRole: "Kepala Instalasi — RS Mitra Sehat",
    messageId:
      "Distribusi tepat waktu dan dukungan teknis yang sangat membantu operasional kami.",
    messageEn:
      "On-time distribution and technical support that truly helps our operations.",
    createdAt: now,
  });

  await db.insert(gallery).values({
    id: randomUUID(),
    titleId: "Pelatihan alat diagnostik",
    titleEn: "Diagnostic equipment training",
    imageUrl: "/placeholder-gallery.svg",
    createdAt: now,
  });

  await db.insert(blogs).values({
    id: randomUUID(),
    slug: "tips-perawatan-alat-medis",
    titleId: "Tips merawat alat medis di klinik",
    titleEn: "Tips for maintaining medical devices in clinics",
    contentId:
      "Kebersihan dan kalibrasi berkala memperpanjang usia alat dan menjaga akurasi diagnosis.",
    contentEn:
      "Regular cleaning and calibration extend device life and keep diagnostics accurate.",
    thumbnailUrl: "/placeholder-blog.svg",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(teams).values({
    id: randomUUID(),
    nameId: "Budi Santoso",
    nameEn: "Budi Santoso",
    positionId: "Direktur Operasional",
    positionEn: "Chief Operating Officer",
    photoUrl: "/placeholder-team.svg",
    sortOrder: 0,
    createdAt: now,
  });

  console.log(`Seeded admin user: ${email} / (password from SEED_ADMIN_PASSWORD or default)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
