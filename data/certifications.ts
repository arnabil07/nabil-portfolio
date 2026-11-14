import type { Certification } from "@/lib/types";

// DUMMY / SAMPLE ENTRIES. The issuers are fictional and the images in public/certificates/
// are illustrations, not real credentials. Replace each entry with a certificate you actually hold:
//   logo           -> issuer logo, e.g. "/certificates/my-issuer.webp"
//   image          -> picture of the certificate, e.g. "/certificates/my-cert.webp" (4:3 works best)
//   credentialUrl  -> the issuer's verification link (https://...); null shows a disabled button
// and set placeholder: false to remove the "Placeholder" label.
export const certifications: Certification[] = [
  {
    id: "cert-sample-1",
    title: "Web Development Fundamentals",
    issuer: "Sample Academy",
    issued: "2024",
    logo: "/certificates/logo-01.webp",
    image: "/certificates/cert-01.webp",
    credentialUrl: "/certificates/cert-01.webp", // dummy: opens the sample image
    placeholder: true,
  },
  {
    id: "cert-sample-2",
    title: "Cloud Computing Essentials",
    issuer: "Example Institute",
    issued: "2024",
    logo: "/certificates/logo-02.webp",
    image: "/certificates/cert-02.webp",
    credentialUrl: "/certificates/cert-02.webp",
    placeholder: true,
  },
  {
    id: "cert-sample-3",
    title: "Responsive Web Design",
    issuer: "Demo Learning",
    issued: "2024",
    logo: "/certificates/logo-03.webp",
    image: "/certificates/cert-03.webp",
    credentialUrl: "/certificates/cert-03.webp",
    placeholder: true,
  },
];
