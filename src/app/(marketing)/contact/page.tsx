import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { ContactForm } from "@/components/contact-form";

function waHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default async function ContactPage() {
  const locale = await getLocale();
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "";

  const labels =
    locale === "en"
      ? {
          title: "Contact",
          intro: "Reach us via WhatsApp, phone, email, or the form below.",
          name: "Name",
          emailLabel: "Email",
          message: "Message",
          submit: "Send message",
          success: "Message sent. We will respond shortly.",
          quick: "Quick contact",
        }
      : {
          title: "Kontak",
          intro: "Hubungi kami melalui WhatsApp, telepon, email, atau formulir di bawah.",
          name: "Nama",
          emailLabel: "Email",
          message: "Pesan",
          submit: "Kirim pesan",
          success: "Pesan terkirim. Kami akan merespons segera.",
          quick: "Kontak cepat",
        };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{labels.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{labels.intro}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium">{labels.quick}</h2>
          <ul className="mt-4 space-y-4">
            {wa ? (
              <li>
                <a
                  href={waHref(wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <MessageCircle className="size-5 text-emerald-600" />
                  <span className="font-medium">WhatsApp</span>
                  <span className="ml-auto text-sm text-muted-foreground">{wa}</span>
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <Mail className="size-5 text-cyan-800" />
                  <span className="font-medium">Email</span>
                  <span className="ml-auto text-sm text-muted-foreground">{email}</span>
                </a>
              </li>
            ) : null}
            {phone ? (
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <Phone className="size-5 text-slate-700" />
                  <span className="font-medium">{locale === "en" ? "Phone" : "Telepon"}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{phone}</span>
                </a>
              </li>
            ) : null}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/products" className="text-cyan-800 underline underline-offset-4">
              {locale === "en" ? "Browse products" : "Lihat produk"}
            </Link>
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <ContactForm
            labels={{
              name: labels.name,
              email: labels.emailLabel,
              message: labels.message,
              submit: labels.submit,
              success: labels.success,
            }}
          />
        </div>
      </div>
    </div>
  );
}
