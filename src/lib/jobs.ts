export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employment: string;
  shift?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  note?: string;
  seoTitle: string;
  seoDescription: string;
};

export const jobs: Job[] = [
  {
    slug: "data-analyst",
    title: "Data Analyst",
    department: "Data & Analytics",
    location: "Pune, Maharashtra",
    employment: "Full-time",
    shift: "Day shift, Monday to Friday",
    description:
      "Work with business, trading and operational data to generate meaningful insights and support data-driven decision making.",
    responsibilities: [
      "Analyze structured business and operational data",
      "Create reports and dashboards",
      "Perform data validation and quality checks",
      "Identify trends, anomalies and data issues",
      "Work with SQL and Excel",
      "Collaborate with technology and business teams",
      "Prepare recurring and ad-hoc reports",
      "Support data-driven process improvements",
    ],
    requirements: [
      "Bachelor's degree in a relevant discipline",
      "Strong SQL fundamentals",
      "Good Excel skills",
      "Basic understanding of data analysis",
      "Strong analytical and problem-solving ability",
      "Good communication skills",
    ],
    preferred: [
      "Python",
      "Power BI",
      "Experience with financial/trading data",
      "Knowledge of databases",
    ],
    note: "Freshers with strong analytical skills may also apply.",
    seoTitle: "Data Analyst Jobs | Nebula Capital",
    seoDescription:
      "Apply for the Data Analyst role at Nebula Capital Advisory Pvt. Ltd. in Pune — reporting, SQL, dashboards and data quality within a proprietary trading environment.",
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    department: "Technology / Data Engineering",
    location: "Pune, Maharashtra",
    employment: "Full-time",
    shift: "Day shift, Monday to Friday",
    description:
      "Build and maintain reliable data pipelines and data platforms that support analytics, reporting and business operations.",
    responsibilities: [
      "Develop and maintain data pipelines",
      "Work with structured and semi-structured data",
      "Perform data ingestion and transformation",
      "Build data quality and validation processes",
      "Work with SQL and Python",
      "Work with cloud/data platforms",
      "Optimize data processing workflows",
      "Collaborate with analysts and business teams",
      "Monitor data pipelines and troubleshoot failures",
      "Maintain technical documentation",
    ],
    requirements: [
      "Strong SQL knowledge",
      "Python fundamentals",
      "Understanding of ETL/ELT concepts",
      "Understanding of databases and data warehouses",
      "Problem-solving skills",
      "Good communication skills",
    ],
    preferred: [
      "Azure",
      "AWS",
      "Databricks",
      "PySpark",
      "ADF",
      "ADLS",
      "Power BI",
      "Git / CI/CD",
    ],
    seoTitle: "Data Engineer Jobs | Nebula Capital",
    seoDescription:
      "Apply for the Data Engineer role at Nebula Capital Advisory Pvt. Ltd. in Pune — build data pipelines and platforms supporting analytics and operations.",
  },
  {
    slug: "telesales-executive",
    title: "Telesales Executive",
    department: "Business Development",
    location: "Pune, Maharashtra",
    employment: "Full-time",
    shift: "Day shift, in-office",
    description:
      "Interact with prospective candidates/customers, understand their requirements, communicate relevant information and support the company's business development activities.",
    responsibilities: [
      "Make outbound calls",
      "Handle inbound enquiries",
      "Explain company offerings clearly",
      "Follow up with prospects",
      "Maintain accurate call and lead records",
      "Coordinate with internal teams",
      "Meet defined activity and performance targets",
      "Maintain professional communication",
    ],
    requirements: [
      "Good verbal communication skills",
      "Hindi and English communication",
      "Marathi would be an advantage",
      "Basic computer knowledge",
      "Positive attitude",
      "Good follow-up skills",
    ],
    preferred: [
      "Prior calling or customer interaction experience",
      "Comfort with CRM tools",
    ],
    note: "Freshers may apply.",
    seoTitle: "Telesales Executive Jobs | Nebula Capital",
    seoDescription:
      "Apply for the Telesales Executive role at Nebula Capital Advisory Pvt. Ltd. in Pune — outbound calling, enquiry handling and business development support.",
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
