import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const sampleContacts = [
  {
    companyName: 'Prothious Engineering Services',
    firstName: 'Ravi',
    lastName: 'Asnani',
    title: 'Co-Founder, Director and Chief Revenue Officer',
    email: 'ravia@prothious.com',
    emailStatus: 'valid',
    employees: '910',
    industry: 'design',
    personLinkedin: 'http://www.linkedin.com/in/ravi-asnani-907389',
    website: 'https://prothious.com',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
  },
  {
    companyName: 'Lomont Molding',
    firstName: 'Jason',
    lastName: 'Bender',
    title: 'President / CEO',
    email: 'jason@lomont.com',
    emailStatus: 'valid',
    employees: '56',
    industry: 'plastics',
    personLinkedin: 'http://www.linkedin.com/in/jason-bender-176a5a8',
    website: 'https://lomont.com',
    city: 'Mount Pleasant',
    state: 'Iowa',
    country: 'United States',
  },
  {
    companyName: 'MacAljon',
    firstName: 'Tim',
    lastName: 'Swinson',
    title: 'CFO',
    email: 'tswinson@macaljon.com',
    emailStatus: 'valid',
    employees: '580',
    industry: 'construction',
    personLinkedin: 'http://www.linkedin.com/in/tim-swinson-28523ba',
    website: 'https://macaljon.com',
    city: 'Savannah',
    state: 'Georgia',
    country: 'United States',
  },
  {
    companyName: 'Latite Roofing & Sheetmetal',
    firstName: 'Jeff',
    lastName: 'Burks',
    title: 'CEO',
    email: 'jburks@latite.com',
    emailStatus: 'valid',
    employees: '130',
    industry: 'construction',
    personLinkedin: 'http://www.linkedin.com/in/jeff-burks-72a90a10',
    website: 'https://latite.com',
    city: 'Pompano Beach',
    state: 'Florida',
    country: 'United States',
  },
  {
    companyName: 'RLG Consulting Engineers',
    firstName: 'Andy',
    lastName: 'Ayers',
    title: 'Chief Operating Officer - Structural',
    email: 'aayers@rlginc.com',
    emailStatus: 'valid',
    employees: '120',
    industry: 'civil engineering',
    personLinkedin: 'http://www.linkedin.com/in/andy-ayers-90bb25a',
    website: 'https://rlginc.com',
    city: 'Dallas',
    state: 'Texas',
    country: 'United States',
  },
  {
    companyName: 'rand* construction',
    firstName: 'Todd',
    lastName: 'Stokes',
    title: 'Chief Operating Officer',
    email: 'tstokes@randcc.com',
    emailStatus: 'valid',
    employees: '410',
    industry: 'construction',
    personLinkedin: 'http://www.linkedin.com/in/toddastokes',
    website: 'https://randcc.com',
    city: 'Baltimore',
    state: 'Maryland',
    country: 'United States',
  },
  {
    companyName: 'ProLytX',
    firstName: 'Jason',
    lastName: 'Davis',
    title: 'Chief Financial Officer',
    email: 'jason.davis@prolytx.com',
    emailStatus: 'valid',
    employees: '62',
    industry: 'oil & energy',
    personLinkedin: 'http://www.linkedin.com/in/ljasondavis',
    website: 'https://prolytx.com',
    city: 'Houston',
    state: 'Texas',
    country: 'United States',
  },
  {
    companyName: 'Renaissance Construction',
    firstName: 'Frank',
    lastName: 'Price',
    title: 'Owner',
    email: 'fprice@renconco.com',
    emailStatus: 'valid',
    employees: '57',
    industry: 'construction',
    personLinkedin: 'http://www.linkedin.com/in/frank-price-a671a11b',
    website: 'https://renconco.com',
    city: 'Florida',
    state: 'Florida',
    country: 'United States',
  },
  {
    companyName: 'Progressive Design',
    firstName: 'Clay',
    lastName: 'Lyons',
    title: 'CFO',
    email: 'clay.lyons@progressive-design.com',
    emailStatus: 'valid',
    employees: '120',
    industry: 'information technology & services',
    personLinkedin: 'http://www.linkedin.com/in/clay-m-lyons-cpa-2b1889ab',
    website: 'https://progressive-design.com',
    city: 'Richmond',
    state: 'Virginia',
    country: 'United States',
  },
  {
    companyName: 'BuildTech Solutions',
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'VP of Operations',
    email: 'sjohnson@buildtech.com',
    emailStatus: 'valid',
    employees: '245',
    industry: 'construction',
    personLinkedin: 'http://www.linkedin.com/in/sarah-johnson',
    website: 'https://buildtech.com',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
  },
];

const CSVDownloadSection = () => {
  const downloadCSV = () => {
    const headers = [
      'Company Name',
      'First Name',
      'Last Name',
      'Title',
      'Email',
      'Email Status',
      '# Employees',
      'Industry',
      'Person Linkedin Url',
      'Website',
      'City',
      'State',
      'Country',
    ];

    const csvContent = [
      headers.join(','),
      ...sampleContacts.map(contact =>
        [
          `"${contact.companyName}"`,
          contact.firstName,
          contact.lastName,
          `"${contact.title}"`,
          contact.email,
          contact.emailStatus,
          contact.employees,
          contact.industry,
          contact.personLinkedin,
          contact.website,
          contact.city,
          contact.state,
          contact.country,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample_contacts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rowColors = [
    'bg-gradient-to-r from-purple-50 to-pink-50',
    'bg-gradient-to-r from-blue-50 to-cyan-50',
    'bg-gradient-to-r from-green-50 to-emerald-50',
    'bg-gradient-to-r from-yellow-50 to-orange-50',
    'bg-gradient-to-r from-red-50 to-pink-50',
    'bg-gradient-to-r from-indigo-50 to-purple-50',
    'bg-gradient-to-r from-teal-50 to-green-50',
    'bg-gradient-to-r from-orange-50 to-red-50',
    'bg-gradient-to-r from-cyan-50 to-blue-50',
    'bg-gradient-to-r from-pink-50 to-rose-50',
  ];

  return (
    <section className="py-12 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent">
            Sample Contact Database
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preview our enriched contact data with verified emails, LinkedIn profiles, and company information
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          <div className="max-h-[500px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF]">
                  <TableHead className="text-white font-bold whitespace-nowrap">Company</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">First Name</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Last Name</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Title</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Email</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Employees</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Industry</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleContacts.map((contact, index) => (
                  <TableRow key={index} className={`${rowColors[index]} hover:opacity-80 transition-opacity`}>
                    <TableCell className="font-medium text-gray-900 whitespace-nowrap">{contact.companyName}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{contact.firstName}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{contact.lastName}</TableCell>
                    <TableCell className="text-gray-600 text-sm whitespace-nowrap">{contact.title}</TableCell>
                    <TableCell className="text-blue-600 font-medium whitespace-nowrap">{contact.email}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {contact.emailStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{contact.employees}</TableCell>
                    <TableCell className="text-gray-600 capitalize whitespace-nowrap">{contact.industry}</TableCell>
                    <TableCell className="text-gray-600 text-sm whitespace-nowrap">
                      {contact.city}, {contact.state}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={downloadCSV}
            size="lg"
            className="bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] hover:opacity-90 text-white font-bold px-8 py-6 text-lg shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Sample CSV
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CSVDownloadSection;
