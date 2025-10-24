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
    companyLinkedin: 'http://www.linkedin.com/company/prothious-engineering-services',
    facebook: '',
    twitter: '',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    companyAddress: 'Mumbai, Maharashtra, India',
    companyCity: 'Mumbai',
    companyState: 'Maharashtra',
    companyCountry: 'India',
    companyPhone: '+1 310-691-5889',
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
    companyLinkedin: 'http://www.linkedin.com/company/lomont-molding-inc-',
    facebook: 'https://www.facebook.com/LomontMoldingLLC/',
    twitter: 'https://twitter.com/Lomont_Molding',
    city: 'Mount Pleasant',
    state: 'Iowa',
    country: 'United States',
    companyAddress: '1516 E Mapleleaf Dr, Mount Pleasant, Iowa, United States, 52641',
    companyCity: 'Mount Pleasant',
    companyState: 'Iowa',
    companyCountry: 'United States',
    companyPhone: '+1 319-385-1528',
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
    companyLinkedin: 'http://www.linkedin.com/company/macaljon',
    facebook: '',
    twitter: '',
    city: 'Savannah',
    state: 'Georgia',
    country: 'United States',
    companyAddress: '4524 Ogeechee Rd, Savannah, Georgia, United States, 31405',
    companyCity: 'Savannah',
    companyState: 'Georgia',
    companyCountry: 'United States',
    companyPhone: '+1 706-771-9893',
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
    companyLinkedin: 'http://www.linkedin.com/company/latite-roofing-&-sheetmetal-llc',
    facebook: 'https://www.facebook.com/Latite-Roofing-and-Sheet-Metal-373691659211/',
    twitter: 'https://twitter.com/Latiteroofing',
    city: 'Pompano Beach',
    state: 'Florida',
    country: 'United States',
    companyAddress: '2280 W Copans Rd, Pompano Beach, Florida, United States, 33069',
    companyCity: 'Pompano Beach',
    companyState: 'Florida',
    companyCountry: 'United States',
    companyPhone: '+1 954-772-3446',
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
    companyLinkedin: 'http://www.linkedin.com/company/rlg-consulting-engineers',
    facebook: 'https://www.facebook.com/RLGconsultingengineers/',
    twitter: '',
    city: 'Dallas',
    state: 'Texas',
    country: 'United States',
    companyAddress: '12001 N Central Expy, Dallas, Texas, United States, 75243',
    companyCity: 'Dallas',
    companyState: 'Texas',
    companyCountry: 'United States',
    companyPhone: '+1 214-739-8100',
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
      'Company Linkedin Url',
      'Facebook Url',
      'Twitter Url',
      'City',
      'State',
      'Country',
      'Company Address',
      'Company City',
      'Company State',
      'Company Country',
      'Company Phone',
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
          contact.companyLinkedin,
          contact.facebook,
          contact.twitter,
          contact.city,
          contact.state,
          contact.country,
          `"${contact.companyAddress}"`,
          contact.companyCity,
          contact.companyState,
          contact.companyCountry,
          contact.companyPhone,
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
    <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-[#FFF5E6] to-gray-50 min-h-screen flex items-center">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#FFF5E6" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                fill="#FFF5E6" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                fill="#FFF5E6" opacity="1"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF]">
                <TableRow>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[150px] sticky top-0 bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF]">Company Name</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[90px]">First Name</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[90px]">Last Name</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[180px]">Title</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[160px]">Email</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[90px]">Status</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[80px]"># Emp</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">Industry</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[180px]">Person LinkedIn</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[140px]">Website</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[180px]">Company LinkedIn</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[140px]">Facebook</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[140px]">Twitter</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">City</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[80px]">State</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">Country</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[200px]">Company Address</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">Co. City</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[80px]">Co. State</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[100px]">Co. Country</TableHead>
                  <TableHead className="text-white font-bold whitespace-nowrap min-w-[120px]">Co. Phone</TableHead>
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
                    <TableCell className="text-blue-500 text-xs whitespace-nowrap">{contact.personLinkedin}</TableCell>
                    <TableCell className="text-blue-500 text-xs whitespace-nowrap">{contact.website}</TableCell>
                    <TableCell className="text-blue-500 text-xs whitespace-nowrap">{contact.companyLinkedin}</TableCell>
                    <TableCell className="text-blue-500 text-xs whitespace-nowrap">{contact.facebook || '-'}</TableCell>
                    <TableCell className="text-blue-500 text-xs whitespace-nowrap">{contact.twitter || '-'}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.city}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.state}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.country}</TableCell>
                    <TableCell className="text-gray-600 text-xs whitespace-nowrap">{contact.companyAddress}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.companyCity}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.companyState}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.companyCountry}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{contact.companyPhone}</TableCell>
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
            📥 Download & Start Outreach 🚀
          </Button>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#f9fafb" opacity="0.3"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                fill="#f9fafb" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                fill="#f9fafb" opacity="1"></path>
        </svg>
      </div>
    </section>
  );
};

export default CSVDownloadSection;
