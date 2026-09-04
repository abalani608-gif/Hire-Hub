export const mockUsers = [
  { id: '1', name: 'Aditya', email: 'aditya@example.com', role: 'seeker' },
  { id: '2', name: 'Aditya', email: 'aditya@gmail.com', role: 'seeker' }
];

export const companies = [
  { id: 'c1', name: 'TechCorp', logo: 'https://via.placeholder.com/50', industry: 'Software', location: 'San Francisco, CA', description: 'Tech giant', website: 'https://techcorp.com', companySize: '1000+' },
  { id: 'c2', name: 'InnovateInc', logo: 'https://via.placeholder.com/50', industry: 'Design', location: 'New York, NY', description: 'Design studio', website: 'https://innovate.com', companySize: '50-200' },
  { id: 'c3', name: 'FinTechPro', logo: 'https://via.placeholder.com/50', industry: 'Finance', location: 'London, UK', description: 'Finance experts', website: 'https://fintechpro.com', companySize: '500-1000' },
  { id: 'c4', name: 'HealthPlus', logo: 'https://via.placeholder.com/50', industry: 'Healthcare', location: 'Boston, MA', description: 'Health solutions', website: 'https://healthplus.com', companySize: '100-500' },
  { id: 'c5', name: 'EduTech', logo: 'https://via.placeholder.com/50', industry: 'Education', location: 'Austin, TX', description: 'Ed-tech startup', website: 'https://edutech.com', companySize: '10-50' },
  { id: 'c6', name: 'GreenEnergy', logo: 'https://via.placeholder.com/50', industry: 'Energy', location: 'Denver, CO', description: 'Renewable energy', website: 'https://greenenergy.com', companySize: '200-500' },
  { id: 'c7', name: 'RetailHub', logo: 'https://via.placeholder.com/50', industry: 'Retail', location: 'Seattle, WA', description: 'E-commerce platform', website: 'https://retailhub.com', companySize: '1000+' },
  { id: 'c8', name: 'AutoDrive', logo: 'https://via.placeholder.com/50', industry: 'Automotive', location: 'Detroit, MI', description: 'Autonomous vehicles', website: 'https://autodrive.com', companySize: '500-1000' }
];

export const jobs = [
  { id: 'j1', title: 'Frontend Developer', companyId: 'c1', company: 'TechCorp', location: 'San Francisco, CA', salary: '$120k - $150k', type: 'Full-time', workMode: 'Remote', experience: '3+ years', skills: ['React', 'JavaScript'], description: 'Great frontend job.', postedDate: new Date(Date.now() - 86400000).toISOString() },
  { id: 'j2', title: 'Backend Engineer', companyId: 'c2', company: 'InnovateInc', location: 'New York, NY', salary: '$130k - $160k', type: 'Full-time', workMode: 'Hybrid', experience: '4+ years', skills: ['Node.js', 'Python'], description: 'Backend role.', postedDate: new Date(Date.now() - 172800000).toISOString() },
  { id: 'j3', title: 'UI/UX Designer', companyId: 'c3', company: 'FinTechPro', location: 'London, UK', salary: '$90k - $120k', type: 'Part-time', workMode: 'On-site', experience: '2+ years', skills: ['Figma', 'Sketch'], description: 'Design interfaces.', postedDate: new Date(Date.now() - 259200000).toISOString() },
  { id: 'j4', title: 'Data Scientist', companyId: 'c4', company: 'HealthPlus', location: 'Boston, MA', salary: '$140k - $180k', type: 'Full-time', workMode: 'Remote', experience: '5+ years', skills: ['Python', 'SQL'], description: 'Analyze data.', postedDate: new Date(Date.now() - 345600000).toISOString() },
  { id: 'j5', title: 'Product Manager', companyId: 'c5', company: 'EduTech', location: 'Austin, TX', salary: '$110k - $140k', type: 'Full-time', workMode: 'Hybrid', experience: '4+ years', skills: ['Agile', 'Jira'], description: 'Manage products.', postedDate: new Date(Date.now() - 432000000).toISOString() },
  { id: 'j6', title: 'Marketing Specialist', companyId: 'c6', company: 'GreenEnergy', location: 'Denver, CO', salary: '$70k - $90k', type: 'Contract', workMode: 'Remote', experience: '1+ years', skills: ['SEO', 'Content'], description: 'Marketing tasks.', postedDate: new Date(Date.now() - 518400000).toISOString() },
  { id: 'j7', title: 'DevOps Engineer', companyId: 'c7', company: 'RetailHub', location: 'Seattle, WA', salary: '$130k - $170k', type: 'Full-time', workMode: 'On-site', experience: '4+ years', skills: ['AWS', 'Docker'], description: 'Infra role.', postedDate: new Date(Date.now() - 604800000).toISOString() },
  { id: 'j8', title: 'QA Tester', companyId: 'c8', company: 'AutoDrive', location: 'Detroit, MI', salary: '$80k - $100k', type: 'Full-time', workMode: 'Hybrid', experience: '2+ years', skills: ['Selenium', 'Cypress'], description: 'Test apps.', postedDate: new Date(Date.now() - 691200000).toISOString() }
];

export const internships = [
  { id: 'i1', title: 'Software Intern', companyId: 'c1', company: 'TechCorp', location: 'San Francisco, CA', stipend: '$5k/month', duration: '3 months', workMode: 'Remote', skills: ['React', 'JavaScript'], description: 'Learn software.', postedDate: new Date(Date.now() - 86400000).toISOString(), fresherFriendly: true },
  { id: 'i2', title: 'Design Intern', companyId: 'c2', company: 'InnovateInc', location: 'New York, NY', stipend: '$4k/month', duration: '6 months', workMode: 'Hybrid', skills: ['Figma', 'Illustrator'], description: 'Design things.', postedDate: new Date(Date.now() - 172800000).toISOString(), fresherFriendly: true },
  { id: 'i3', title: 'Marketing Intern', companyId: 'c3', company: 'FinTechPro', location: 'London, UK', stipend: '$3k/month', duration: '3 months', workMode: 'On-site', skills: ['Social Media', 'Writing'], description: 'Market things.', postedDate: new Date(Date.now() - 259200000).toISOString(), fresherFriendly: false },
  { id: 'i4', title: 'Data Analytics Intern', companyId: 'c4', company: 'HealthPlus', location: 'Boston, MA', stipend: '$4.5k/month', duration: '4 months', workMode: 'Remote', skills: ['Excel', 'SQL'], description: 'Analyze stuff.', postedDate: new Date(Date.now() - 345600000).toISOString(), fresherFriendly: true },
  { id: 'i5', title: 'Product Intern', companyId: 'c5', company: 'EduTech', location: 'Austin, TX', stipend: '$4k/month', duration: '3 months', workMode: 'Hybrid', skills: ['Research', 'Communication'], description: 'Product tasks.', postedDate: new Date(Date.now() - 432000000).toISOString(), fresherFriendly: true },
  { id: 'i6', title: 'HR Intern', companyId: 'c6', company: 'GreenEnergy', location: 'Denver, CO', stipend: '$3k/month', duration: '6 months', workMode: 'On-site', skills: ['Recruiting', 'Admin'], description: 'HR tasks.', postedDate: new Date(Date.now() - 518400000).toISOString(), fresherFriendly: true },
  { id: 'i7', title: 'Finance Intern', companyId: 'c7', company: 'RetailHub', location: 'Seattle, WA', stipend: '$4k/month', duration: '3 months', workMode: 'Remote', skills: ['Accounting', 'Excel'], description: 'Finance tasks.', postedDate: new Date(Date.now() - 604800000).toISOString(), fresherFriendly: true },
  { id: 'i8', title: 'Operations Intern', companyId: 'c8', company: 'AutoDrive', location: 'Detroit, MI', stipend: '$3.5k/month', duration: '4 months', workMode: 'Hybrid', skills: ['Logistics', 'Planning'], description: 'Ops tasks.', postedDate: new Date(Date.now() - 691200000).toISOString(), fresherFriendly: true }
];
