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
    slug: "equity-analyst",
    title: "Equity Analyst Trainee – US Markets",
    department: "Trading",
    location: "Pune, Maharashtra",
    employment: "Full-time",
    shift: "6:00 PM – 1:30 AM IST, Monday to Friday",
    description:
      "Analyze US stock markets, study company fundamentals and market trends, monitor financial news, and make informed trading decisions using trading software.",
    responsibilities: [
      "Analyze US stocks and market trends",
      "Perform technical and fundamental analysis",
      "Monitor US market news and developments",
      "Use trading software and prepare market reports",
    ],
    requirements: [
      "Age below 25 years",
      "Strong analytical and mathematical skills",
      "Interest in US stock markets and trading",
      "Graduate/postgraduate; Finance qualifications preferred",
      "Willingness to complete 4 months of unpaid training",
      "Must not have attended the selection process in the last 3 months",
    ],
    preferred: [
      "Technical analysis",
      "Fundamental analysis",
      "US stock markets (NYSE/NASDAQ)",
      "Excel and trading software",
    ],
    note: "Freshers may apply. No prior experience is required.",
    seoTitle: "US Equity Analyst Jobs in Pune | Nebula Capital",
    seoDescription:
      "Apply for the US Equity Analyst Trainee role at Nebula Capital, Pune. Four-month unpaid training for eligible candidates below 25, with post-training CTC of ₹3–6 LPA based on performance.",
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
