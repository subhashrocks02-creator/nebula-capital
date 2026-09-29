import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/company";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | Nebula Capital Advisory Pvt. Ltd." },
      {
        name: "description",
        content:
          "Disclaimer for the Nebula Capital Advisory Pvt. Ltd. website. Information on this site is for general informational and recruitment purposes only.",
      },
      { property: "og:title", content: "Disclaimer | Nebula Capital Advisory Pvt. Ltd." },
      {
        property: "og:description",
        content: "Website disclaimer for Nebula Capital Advisory Pvt. Ltd., a proprietary trading firm in Pune.",
      },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <LegalPage eyebrow="Legal" title="Disclaimer">
      <LegalBlock title="General">
        <p>{company.disclaimer}</p>
      </LegalBlock>
      <LegalBlock title="No investment advice">
        <p>
          Nothing published on this website is investment, legal, tax or financial advice, and no
          content should be relied upon for any trading or investment decision.
        </p>
      </LegalBlock>
      <LegalBlock title="No regulatory claims">
        <p>
          {company.name} presents itself only as a proprietary trading firm. No claim is made on this
          website regarding any registration, licence, authorisation or approval from any regulator,
          exchange or authority.
        </p>
      </LegalBlock>
      <LegalBlock title="Website content">
        <p>
          Content on this website, including role descriptions, may be updated or removed at any
          time without notice. External links are provided for convenience and we are not
          responsible for their content.
        </p>
      </LegalBlock>
      <LegalBlock title="Contact">
        <p>
          Questions about this disclaimer can be sent to{" "}
          <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
            {company.email}
          </a>
          .
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
