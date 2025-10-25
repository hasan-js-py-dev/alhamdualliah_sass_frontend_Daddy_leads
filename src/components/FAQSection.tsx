import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does the LinkedIn scraping process work?",
      answer: "Our LinkedIn scrapers use advanced automation to extract data from LinkedIn Sales Navigator, LinkedIn profiles, and company pages. Simply provide your search criteria or profile URLs, and our tool will collect names, titles, companies, emails, and other relevant information in minutes. All data is exported in CSV format for easy integration with your CRM."
    },
    {
      question: "Do you provide emails for all the leads that you scrape?",
      answer: "Yes! Our Email Enricher automatically finds and verifies professional email addresses for the leads we scrape. We use multiple data sources and verification methods to ensure high accuracy rates (95%+). If an email isn't available in our database, we use advanced algorithms to generate and verify potential email addresses."
    },
    {
      question: "What is the difference between Email Enricher and Email Verifier?",
      answer: "Email Enricher finds missing email addresses for your leads by searching across multiple databases and using intelligent email pattern matching. Email Verifier checks if existing email addresses are valid, deliverable, and active by performing real-time verification checks including syntax validation, domain verification, and mailbox confirmation."
    },
    {
      question: "Can I scrape data from Apollo, ZoomInfo, and other B2B databases?",
      answer: "Absolutely! We offer specialized scrapers for Apollo, ZoomInfo, Crunchbase, and other major B2B databases. These scrapers can extract company information, contact details, funding data, and technographic information. You can use filters to target specific industries, company sizes, locations, and more."
    },
    {
      question: "How long does it take to complete a scraping request?",
      answer: "Processing time depends on the size of your request. Small batches (up to 500 leads) typically complete in 5-15 minutes. Medium batches (500-2,000 leads) take 30-60 minutes. Large requests (2,000+ leads) may take 2-4 hours. You'll receive an email notification when your data is ready for download."
    },
    {
      question: "Is the data scraping compliant with LinkedIn's terms of service?",
      answer: "We prioritize ethical data collection practices. Our tools are designed for legitimate business purposes such as lead generation, market research, and recruitment. We recommend users review and comply with LinkedIn's terms of service and applicable data protection regulations (GDPR, CCPA) in their jurisdiction. Users are responsible for how they use the collected data."
    },
    {
      question: "What file formats do you support for data export and import?",
      answer: "We support CSV (Comma Separated Values) and Excel (XLSX) formats for both import and export. You can upload your existing lead lists for enrichment or verification, and download the processed results in your preferred format. Our CSV files are compatible with all major CRM systems including Salesforce, HubSpot, Pipedrive, and more."
    }
  ];

  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Title Section */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#411c78' }}>
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/90 transition-colors">
                    <span className="text-base md:text-lg font-semibold pr-4" style={{ color: '#411c78' }}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
