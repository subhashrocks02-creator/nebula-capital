import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/company";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Nebula Capital Advisory Pvt. Ltd." },
      {
        name: "description",
        content:
          "Terms governing the use of the Nebula Capital Advisory Pvt. Ltd. website, including acceptable use, intellectual property and liability.",
      },
      { property: "og:title", content: "Terms of Use | Nebula Capital Advisory Pvt. Ltd." },
      {
        property: "og:description",
        content: "Terms governing your use of the Nebula Capital Advisory Pvt. Ltd. website.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lead="By using this website you agree to the terms set out below."
    >
      <LegalBlock title="Purpose of this website">
        <p>
          This website provides general information about {company.name} and details of current
          career opportunities. It does not offer any product, service or financial instrument.
        </p>
      </LegalBlock>
      <LegalBlock title="Acceptable use">
        <p>
          You agree not to misuse this website, including attempting unauthorised access, submitting
          false information or uploading harmful files. Only genuine job applications and enquiries
          should be submitted through our forms.
        </p>
      </LegalBlock>
      <LegalBlock title="Accuracy of information">
        <p>
          We aim to keep content accurate and current, but the website is provided on an as-is basis
          and may be changed or updated at any time without notice.
        </p>
      </LegalBlock>
      <LegalBlock title="Intellectual property">
        <p>
          The name, logo, text and design of this website belong to {company.name} and may not be
          copied or reused without written permission.
        </p>
      </LegalBlock>
      <LegalBlock title="Limitation of liability">
        <p>
          To the extent permitted by law, {company.name} is not liable for any loss arising from use
          of, or reliance on, this website or its content.
        </p>
      </LegalBlock>
      <LegalBlock title="Governing law">
        <p>
          These terms are governed by the laws of India, and the courts at Pune, Maharashtra shall
          have jurisdiction over any dispute.
        </p>
      </LegalBlock>
      <LegalBlock title="Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
            {company.email}
          </a>
          .
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
