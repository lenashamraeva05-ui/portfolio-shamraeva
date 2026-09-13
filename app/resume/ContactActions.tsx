"use client";

import { Mail, Phone } from "lucide-react";
import { useState } from "react";

type ContactKind = "email" | "phone";

const contactDetails: Record<ContactKind, { value: string; href: string; message: string }> = {
  email: {
    value: "lena.shamraeva.05@gmail.com",
    href: "mailto:lena.shamraeva.05@gmail.com",
    message: "Email copied",
  },
  phone: {
    value: "+44 7956 042838",
    href: "tel:+447956042838",
    message: "Phone number copied",
  },
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export default function ContactActions() {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = (kind: ContactKind) => {
    const { value, message } = contactDetails[kind];
    void copyText(value).catch(() => undefined);
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <>
      <a
        href={contactDetails.email.href}
        className="resume-contact-link"
        onClick={(event) => {
          event.preventDefault();
          handleCopy("email");
          window.open(contactDetails.email.href, "_blank", "noopener,noreferrer");
        }}
        title="Copy email and write"
      >
        <Mail className="resume-contact-icon" aria-hidden="true" />
        {contactDetails.email.value}
      </a>
      <a
        href={contactDetails.phone.href}
        className="resume-contact-link"
        onClick={() => handleCopy("phone")}
        title="Copy phone number"
      >
        <Phone className="resume-contact-icon" aria-hidden="true" />
        {contactDetails.phone.value}
      </a>
      {toast && (
        <div className="resume-copy-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
}
