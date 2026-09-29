import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/company";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Nebula Capital Advisory Pvt. Ltd." },
      {
        name: "description",
        content:
          "How Nebula Capital Advisory Pvt. Ltd. collects, uses, stores and retains information submitted through the website contact form and job applications.",
      },
      { property: "og:title", content: "Privacy Policy | Nebula Capital Advisory Pvt. Ltd." },
      {
        property: "og:description",
        content: "Our approach to contact form data, career applications, resumes and data security.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="This policy explains what information we collect through this website and how we use it."
    >
      <LegalBlock title="Information submitted through contact forms">
        <p>
          When you use our contact form we collect the name, email address, phone number, subject and
          message you provide. We use this information only to understand and respond to your
          enquiry.
        </p>
      </LegalBlock>
      <LegalBlock title="Career application information">
        <p>
          When you apply for a role we collect the position applied for, your name, email address,
          phone number, city, qualification, experience, LinkedIn profile if provided, any cover note
          and your consent confirmation. This information is used to assess your application.
        </p>
      </LegalBlock>
      <LegalBlock title="Resume uploads">
        <p>
          Resumes are accepted in PDF, DOC and DOCX formats and are transmitted to our HR mailbox
          together with your application details. We do not accept executable files.
        </p>
      </LegalBlock>
      <LegalBlock title="Email communication">
        <p>
          Submissions from this website are delivered by email to{" "}
          <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
            {company.email}
          </a>
          . Your email address is set as the reply address so our team can respond to you directly.
        </p>
      </LegalBlock>
      <LegalBlock title="Purpose of collecting information">
        <p>
          We collect information solely to respond to enquiries and to evaluate candidates for
          current and future openings. We do not sell your information, and we do not use it for
          advertising.
        </p>
      </LegalBlock>
      <LegalBlock title="Data security">
        <p>
          Form submissions are sent over encrypted connections and our email credentials are held
          server-side and never exposed in the website. Access to applications is limited to the
          people involved in recruitment and hiring.
        </p>
      </LegalBlock>
      <LegalBlock title="Retention">
        <p>
          Enquiries and applications are retained only for as long as needed for the purpose they
          were submitted for, or for consideration for future openings. You can ask us to delete your
          information at any time by writing to us.
        </p>
      </LegalBlock>
      <LegalBlock title="Contact">
        <p>
          For any privacy question or deletion request, contact {company.name} at{" "}
          <a href={`mailto:${company.email}`} className="font-medium text-brand-deep hover:underline">
            {company.email}
          </a>
          , {company.addressInline}.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
