export const siteConfig = {
  name: "SkillVexa",
  email: "skillvexa@gmail.com",
  phone: "+92 312 1234567",
  address: "PIA Road Lahore, Pakistan",
  tagline:
    "Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.",
  socials: {
    instagram: "https://instagram.com/skillvexa",
    facebook: "https://facebook.com/skillvexa",
    twitter: "https://twitter.com/skillvexa",
    linkedin: "https://linkedin.com/company/skillvexa",
    youtube: "https://youtube.com",
  },
  nav: [
    { label: "Courses", href: "/courses" },
    {
      label: "Career Paths",
      href: "/career-paths",
      children: [
        { label: "Data Analyst", href: "/career-paths/data-analyst" },
        { label: "Senior Data Scientist", href: "/career-paths/data-scientist" },
        { label: "Machine Learning Scientist", href: "/career-path/machine-scientist" },
        {label: "Data Sceintist",href:"/career-path/data-sceintist"},
        {label: "Tableau Developer",href:"/career-path/tableau-developer"},
        {label:"AI Engineer",href:"/career-path/ai-engineer"},
        {label:"Buisness Analyst",href:"/career-path/buisness-analyst"},
        {label:"Power BI Developer",href:"/career-path/power-bi-developer"},
        {label:"AI Agent Engineer",href:"/career-path/ai-agent-engineer"},
        {label:"Senior Data Scientist",href:"/career-path/senior-data-scientist"},
        {label:"Data Engineer",href:"/career-path/data-engineer"},
        {label:"Quant Finance Analyst",href:"/career-path/quant-finance-analyst"},
      ],
    },
    { label: "Projects", href: "/projects" },
    {
      label: "Resources",
      href: "/resources",
      children: [
        {
          label: "Career Kit",
          href: "/career-kit",
          children: [
            { label: "Interview Simulator", href: "/career-kit/interview-simulator" },
            { label: "Career Quiz", href: "/career-kit/career-quiz" },
            { label: "Career Guides", href: "/career-kit/career-guides" },
          ],
        },
        {
          label: "Study Kit",
          href: "/study-kit",
          children: [
            { label: "Flashcards", href: "/study-kit/flashcards" },
            { label: "Course Notes", href: "/study-kit/course-notes" },
            { label: "Practice Exams", href: "/study-kit/practice-exams" },
            { label: "Infographics", href: "/study-kit/infographics" },
            { label: "Coding Templates", href: "/study-kit/coding-templates" },
          ],
        },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      label: "Student Outcomes",
      href: "/stories",
      children: [
        { label: "Success Stories", href: "/stories" },
        { label: "Reviews", href: "/reviews" },
        {label:"Student Outcomes Report",href:"/student-report"}
      ],
    },
    { label: "Pricing", href: "/pricing" },
  ],
  footer: {
    platform: [
      { label: "Courses", href: "/courses" },
      { label: "Career Paths", href: "/career-paths" },
      { label: "Projects", href: "/projects" },
      { label: "Certifications", href: "/certifications" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Help Center", href: "/help-center" },
    ],
    company: [
      { label: "About Us", href: "/about-us" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ’s", href: "/faqs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    legal: [
      { label: "Terms & Conditions", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  hero: {
    badge: "AI-POWERED CAREER EXCELLENCE",
    titleLead: "Learn",
    titleAccent: "Skills.",
    titleMid: "Build Your",
    titleAccentTwo: "Future.",
    description:
      "Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.",
    primaryCta: { label: "Start Learning Free", href: "/get-started" },
    secondaryCta: { label: "Explore Courses", href: "/courses" },
    path: ["Learn", "Practice", "Build", "Get Certified"],
    rating: 4.9,
    reviews: 870,
    reviewsLabel: "reviews on",
  },
  stats: [
    { value: "25K", label: "Active Students" },
    { value: "20+", label: "Courses" },
    { value: "120+", label: "Hours Content" },
    { value: "98%", label: "Happy Students" },
    { value: "110+", label: "Active Clients" },
    { value: "10K", label: "Enrollments P/Y" },
  ],
  employersHeading: "Where our AI and data science graduates work",
  employers: [
    { name: "Google", src: "/images/logos/google.svg", width: 112, height: 37 },
    { name: "Facebook", src: "/images/logos/facebook.svg", width: 137, height: 27 },
    { name: "YouTube", src: "/images/logos/youtube.svg", width: 126, height: 28 },
    { name: "Pinterest", src: "/images/logos/pinterest.svg", width: 141, height: 34 },
    { name: "Webflow", src: "/images/logos/webflow.svg", width: 135, height: 34 },
  ],
  howItWorks: {
    heading: "How SkillVexa Works",
    cta: { label: "Find Your Learning Path", href: "/career-paths" },
    steps: [
      {
        id: "learn",
        title: "Learn",
        icon: "/images/icons/icon-learn.svg",
        description:
          "Select a specialized career target or concrete topic you want to master.",
      },
      {
        id: "path",
        title: "Follow Your Path",
        icon: "/images/icons/icon-path.svg",
        description:
          "Let our AI map out custom, modular lesson paths unique to your pacing.",
      },
      {
        id: "practice",
        title: "Learn & Practice",
        icon: "/images/icons/icon-practice.svg",
        description:
          "Combine expert video explanations with instant interactive workspace.",
      },
      {
        id: "prove",
        title: "Build & Prove",
        icon: "/images/icons/icon-prove.png",
        description:
          "Publish robust portfolio projects and earn industry-certified credentials.",
      },
    ],
  },
  courses: {
    headingLead: "Most",
    headingAccent: "Popular",
    headingEnd: "Courses",
    cta: { label: "Explore All Courses", href: "/courses" },
    items: [
      {
        id: "python-data-science",
        title: "Python for Data Science",
        description:
          "Select a specialized career target or concrete topic you want to master.",
        image: "/images/courses/python.png",
        rating: 4.9,
        duration: "08h 20m",
        lessons: "12 Lessons",
        learners: "24K+ Learners",
        href: "/courses/python-data-science",
      },
      {
        id: "machine-learning",
        title: "Machine Learning",
        description:
          "Learn the fundamentals of machine learning algorithms and their applications.",
        image: "/images/courses/machine-learning.png",
        rating: 4.8,
        duration: "10h 15m",
        lessons: "15 Lessons",
        learners: "18K+ Learners",
        href: "/courses/machine-learning",
      },
      {
        id: "web-development",
        title: "Web Development",
        description:
          "Master front-end and back-end skills to create dynamic websites.",
        image: "/images/courses/web-development.png",
        rating: "5.0",
        duration: "20h 30m",
        lessons: "25 Lessons",
        learners: "30K+ Learners",
        href: "/courses/web-development",
      },
    ],
  },
  stories: {
    headingLead: "Our AI and data science bootcamp is",
    headingAccent: "beginner-friendly.",
    description:
      "Most of our graduates start right where you are—and build AI and data science careers in under a year at companies like:",
    heroColumns: {
      leftOuter: [
        {
          name: "Sofia M.",
          role: "Senior UX Designer",
          before: "250",
          previous: "UI/UX Designer at Tech Innovations",
          image: "/images/students/sofia.png",
        },
        {
          name: "Emily T.",
          role: "Digital Marketing",
          before: "310",
          previous: "Marketing Coordinator at Bright Media",
          image: "/images/students/emily.png",
        },
      ],
      leftInner: [
        {
          name: "Raj P.",
          role: "Software Engineer",
          before: "420",
          previous: "Full Stack Developer at Creative Solutions",
          image: "/images/students/raj-hero.png",
        },
        {
          name: "Liam S.",
          role: "Product Manager",
          before: "290",
          previous: "Project Lead at NextGen Products",
          image: "/images/students/liam.png",
        },
      ],
      rightInner: [
        {
          name: "Sofia M.",
          role: "Senior UX Designer",
          before: "250",
          previous: "UI/UX Designer at Tech Innovations",
          image: "/images/students/sofia-2.png",
        },
        {
          name: "Emily T.",
          role: "Digital Marketing",
          before: "310",
          previous: "Marketing Coordinator at Bright Media",
          image: "/images/students/emily-2.png",
        },
      ],
      rightOuter: [
        {
          name: "Raj P.",
          role: "Software Engineer",
          before: "420",
          previous: "Full Stack Developer at Creative Solutions",
          image: "/images/students/raj.png",
        },
        {
          name: "Liam S.",
          role: "Product Manager",
          before: "290",
          previous: "Project Lead at NextGen Products",
          image: "/images/students/liam-2.png",
        },
      ],
    },
    items: [
      {
        name: "Liam S.",
        role: "Product Manager",
        before: "290",
        previous: "Project Lead at NextGen Products",
        image: "/images/students/liam.png",
      },
      {
        name: "Emma J.",
        role: "UX Designer",
        before: "320",
        previous: "Senior Designer at Creative Solutions",
        image: "/images/students/emma.png",
      },
      {
        name: "Noah R.",
        role: "Software Engineer",
        before: "280",
        previous: "Lead Developer at Tech Innovators",
        image: "/images/students/noah.png",
      },
      {
        name: "Olivia T.",
        role: "Data Analyst",
        before: "250",
        previous: "Analyst at Smart Data Co.",
        image: "/images/students/olivia.png",
      },
      {
        name: "Ava K.",
        role: "Marketing Specialist",
        before: "300",
        previous: "Marketing Coordinator at Brand Builders",
        image: "/images/students/ava.png",
      },
      {
        name: "Ethan M.",
        role: "Sales Executive",
        before: "270",
        previous: "Sales Lead at Success Corp",
        image: "/images/students/ethan.png",
      },
      {
        name: "Sophia G.",
        role: "Content Strategist",
        before: "310",
        previous: "Content Manager at Digital Creatives",
        image: "/images/students/sophia.png",
      },
      {
        name: "Jackson P.",
        role: "QA Engineer",
        before: "240",
        previous: "Quality Assurance Lead at Reliable Tech",
        image: "/images/students/jackson.png",
      },
      {
        name: "Mia L.",
        role: "Graphic Designer",
        before: "295",
        previous: "Visual Designer at Innovative Concepts",
        image: "/images/students/mia.png",
      },
      {
        name: "Lucas H.",
        role: "DevOps Engineer",
        before: "285",
        previous: "Infrastructure Engineer at Cloud Solutions",
        image: "/images/students/lucas.png",
      },
      {
        name: "Noah R.",
        role: "Software Engineer",
        before: "280",
        previous: "Lead Developer at Tech Innovators",
        image: "/images/students/noah-2.png",
      },
      {
        name: "Olivia T.",
        role: "Data Analyst",
        before: "250",
        previous: "Analyst at Smart Data Co.",
        image: "/images/students/olivia-2.png",
      },
      {
        name: "Ava K.",
        role: "Marketing Specialist",
        before: "300",
        previous: "Marketing Coordinator at Brand Builders",
        image: "/images/students/ava-2.png",
      },
      {
        name: "Ethan M.",
        role: "Sales Executive",
        before: "270",
        previous: "Sales Lead at Success Corp",
        image: "/images/students/ethan-2.png",
      },
      {
        name: "Sophia G.",
        role: "Content Strategist",
        before: "310",
        previous: "Content Manager at Digital Creatives",
        image: "/images/students/sophia-2.png",
      },
      {
        name: "Jackson P.",
        role: "QA Engineer",
        before: "240",
        previous: "Quality Assurance Lead at Reliable Tech",
        image: "/images/students/jackson-2.png",
      },
    ],
  },
  pricing: {
    headingLead: "Your career in AI and data science",
    headingAccent: "STARTS TODAY.",
    description:
      "Most of our graduates start right where you are—and build AI and data science careers in under a year at companies like:",
    plans: [
      {
        id: "free",
        name: "Free",
        icon: "/images/icons/plan-free.svg",
        caption: "Best for solo creators and bloggers",
        price: "$0",
        period: "Per Month",
        includesLabel: "Includes:",
        features: [
          "Brand voice configuration",
          "10 custom templates loaded",
          "Team onboarding session",
          "30-day email support",
        ],
        cta: { label: "Get Started", href: "/get-started", variant: "orange" },
      },
      {
        id: "self-study",
        name: "Self-study",
        icon: "/images/icons/plan-self.svg",
        caption: "Best for startups and small teams",
        price: "$149",
        period: "Per Month",
        note: "Cancel or pause any time",
        badge: "Most Popular",
        featured: true,
        includesLabel: "Includes everything in Free:",
        features: [
          "20 pieces of content per month",
          "SEO optimization included",
          "Social, blog & email covered",
          "Monthly performance report",
        ],
        cta: { label: "Upgrade to Pro", href: "/pricing", variant: "blue" },
      },
      {
        id: "lifetime",
        name: "Lifetime",
        icon: "/images/icons/plan-lifetime.svg",
        caption: "Best for large teams and agencies",
        price: "Custom",
        note: "Cancel or pause any time",
        includesLabel: "Includes everything in Self-Study:",
        features: [
          "Dedicated content strategist",
          "Custom AI model fine-tuning",
          "Direct Slack channel",
          "Weekly strategy & performance calls",
        ],
        cta: { label: "Contact Sales", href: "/contact-us", variant: "orange" },
      },
    ],
  },
  projects: {
    headingLead: "Build Portfolio",
    headingAccent: "Projects",
    cta: { label: "Explore Projects", href: "/projects" },
    items: [
      {
        id: "customer-churn",
        title: "Customer Churn Analysis",
        description:
          "Build predictive models on real banking datasets to analyze exit rates.",
        image: "/images/courses/python.png",
        type: "Skill Track project",
        duration: "13 Hours",
        href: "/projects/customer-churn-analysis",
      },
      {
        id: "market-basket",
        title: "Market Basket Analysis",
        description:
          "Utilize transaction data to identify patterns in customer purchasing behavior.",
        image: "/images/courses/machine-learning.png",
        type: "Practice project",
        duration: "10 Hours",
        href: "/projects/market-basket-analysis",
      },
      {
        id: "customer-segmentation",
        title: "Customer Segmentation",
        description:
          "Apply clustering techniques to group customers based on purchasing habits and demographics.",
        image: "/images/courses/web-development.png",
        type: "Skill Track project",
        duration: "12 Hours",
        href: "/projects/customer-segmentation",
      },
    ],
  },
  coursesPage: {
    headingLead: "Explore Our",
    headingAccent: "Courses",
    description:
      "Explore practical courses designed to help you build in-demand skills, complete real projects, and grow with confidence.",
    searchPlaceholder: "Search Courses......",
    searchCta: "Search",
    resultLabel: "Result",
    filters: [
      {
        id: "topic",
        label: "Topics",
        options: [
          "Data Science",
          "Machine Learning",
          "Web Development",
          "Cloud Computing",
          "Cybersecurity",
          "Mobile",
          "Blockchain",
          "Artificial Intelligence",
        ],
      },
      {
        id: "technology",
        label: "Technology",
        options: ["Python", "JavaScript", "Cloud", "Security", "Mobile", "Blockchain"],
      },
      {
        id: "difficulty",
        label: "Level of difficulty",
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        id: "duration",
        label: "Duration",
        options: ["Under 10 hours", "10–15 hours", "15+ hours"],
      },
      {
        id: "track",
        label: "Career Track",
        options: ["Data", "Engineering", "Security", "Product"],
      },
    ],
    catalog: [
      {
        id: "python-data-science",
        title: "Python for Data Science",
        description:
          "Select a specialized career target or concrete topic you want to master.",
        image: "/images/courses/python.png",
        rating: 4.9,
        duration: "08h 20m",
        lessons: "12 Lessons",
        learners: "24K+ Learners",
        href: "/courses/python-data-science",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Data Science",
        technology: "Python",
        difficulty: "Beginner",
        durationBand: "Under 10 hours",
        track: "Data",
      },
      {
        id: "machine-learning",
        title: "Machine Learning",
        description:
          "Learn the fundamentals of machine learning algorithms and their applications.",
        image: "/images/courses/machine-learning.png",
        rating: 4.8,
        duration: "10h 15m",
        lessons: "15 Lessons",
        learners: "18K+ Learners",
        href: "/courses/machine-learning",
        badge: { label: "trending topic", variant: "trending" },
        topic: "Machine Learning",
        technology: "Python",
        difficulty: "Intermediate",
        durationBand: "10–15 hours",
        track: "Data",
      },
      {
        id: "web-development",
        title: "Web Development",
        description:
          "Master front-end and back-end skills to create dynamic websites.",
        image: "/images/courses/web-development.png",
        rating: "5.0",
        duration: "20h 30m",
        lessons: "25 Lessons",
        learners: "30K+ Learners",
        href: "/courses/web-development",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Web Development",
        technology: "JavaScript",
        difficulty: "Beginner",
        durationBand: "15+ hours",
        track: "Engineering",
      },
      {
        id: "cloud-computing",
        title: "Cloud Computing",
        description:
          "Understand cloud service models and how to deploy applications in the cloud.",
        image: "/images/courses/cloud-computing.png",
        rating: 4.6,
        duration: "12h 5m",
        lessons: "18 Lessons",
        learners: "10K+ Learners",
        href: "/courses/cloud-computing",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Cloud Computing",
        technology: "Cloud",
        difficulty: "Intermediate",
        durationBand: "10–15 hours",
        track: "Engineering",
      },
      {
        id: "data-visualization-python",
        title: "Data Visualization Python",
        description:
          "Explore techniques to create impactful visual representations of data.",
        image: "/images/courses/data-visualization.png",
        rating: 4.7,
        duration: "6h 45m",
        lessons: "10 Lessons",
        learners: "15K+ Learners",
        href: "/courses/data-visualization-python",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Data Science",
        technology: "Python",
        difficulty: "Beginner",
        durationBand: "Under 10 hours",
        track: "Data",
      },
      {
        id: "cybersecurity-essentials",
        title: "Cybersecurity Essentials",
        description:
          "Learn about securing networks and protecting sensitive information.",
        image: "/images/courses/cybersecurity.png",
        rating: 4.8,
        duration: "9h 0m",
        lessons: "12 Lessons",
        learners: "8K+ Learners",
        href: "/courses/cybersecurity-essentials",
        badge: { label: "Most Popular", variant: "popular" },
        topic: "Cybersecurity",
        technology: "Security",
        difficulty: "Beginner",
        durationBand: "Under 10 hours",
        track: "Security",
      },
      {
        id: "mobile-app-development",
        title: "Mobile App Development",
        description: "Build engaging mobile applications for iOS and Android.",
        image: "/images/courses/mobile-app.png",
        rating: 4.5,
        duration: "15h 0m",
        lessons: "20 Lessons",
        learners: "22K+ Learners",
        href: "/courses/mobile-app-development",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Mobile",
        technology: "Mobile",
        difficulty: "Intermediate",
        durationBand: "10–15 hours",
        track: "Engineering",
      },
      {
        id: "machine-learning-2",
        title: "Machine Learning",
        description:
          "Learn the fundamentals of machine learning algorithms and their applications.",
        image: "/images/courses/machine-learning-2.png",
        rating: 4.8,
        duration: "10h 15m",
        lessons: "15 Lessons",
        learners: "18K+ Learners",
        href: "/courses/machine-learning-advanced",
        badge: { label: "trending topic", variant: "trending" },
        topic: "Machine Learning",
        technology: "Python",
        difficulty: "Advanced",
        durationBand: "10–15 hours",
        track: "Data",
      },
      {
        id: "web-development-2",
        title: "Web Development",
        description:
          "Master front-end and back-end skills to create dynamic websites.",
        image: "/images/courses/web-development-2.png",
        rating: "5.0",
        duration: "20h 30m",
        lessons: "25 Lessons",
        learners: "30K+ Learners",
        href: "/courses/web-development-fullstack",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Web Development",
        technology: "JavaScript",
        difficulty: "Intermediate",
        durationBand: "15+ hours",
        track: "Engineering",
      },
      {
        id: "data-science-foundations",
        title: "Data Science Foundations",
        description:
          "Gain a solid understanding of data analysis, statistics, and programming.",
        image: "/images/courses/data-science.png",
        rating: 4.9,
        duration: "11h 50m",
        lessons: "14 Lessons",
        learners: "16K+ Learners",
        href: "/courses/data-science-foundations",
        badge: { label: "trending topic", variant: "trending" },
        topic: "Data Science",
        technology: "Python",
        difficulty: "Beginner",
        durationBand: "10–15 hours",
        track: "Data",
      },
      {
        id: "blockchain-basics",
        title: "Blockchain Basics",
        description:
          "Discover the principles behind blockchain technology and its use cases.",
        image: "/images/courses/blockchain.png",
        rating: 4.7,
        duration: "7h 30m",
        lessons: "9 Lessons",
        learners: "5K+ Learners",
        href: "/courses/blockchain-basics",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Blockchain",
        technology: "Blockchain",
        difficulty: "Beginner",
        durationBand: "Under 10 hours",
        track: "Engineering",
      },
      {
        id: "web-development-3",
        title: "Web Development",
        description:
          "Master front-end and back-end skills to create dynamic websites.",
        image: "/images/courses/web-development-3.png",
        rating: "5.0",
        duration: "20h 30m",
        lessons: "25 Lessons",
        learners: "30K+ Learners",
        href: "/courses/web-development-frontend",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Web Development",
        technology: "JavaScript",
        difficulty: "Advanced",
        durationBand: "15+ hours",
        track: "Engineering",
      },
      {
        id: "artificial-intelligence",
        title: "Artificial Intelligence",
        description:
          "Learn the basics of AI, machine learning, and neural networks.",
        image: "/images/courses/artificial-intelligence.png",
        rating: 4.8,
        duration: "13h 15m",
        lessons: "16 Lessons",
        learners: "14K+ Learners",
        href: "/courses/artificial-intelligence",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Artificial Intelligence",
        technology: "Python",
        difficulty: "Intermediate",
        durationBand: "10–15 hours",
        track: "Data",
      },
      {
        id: "machine-learning-3",
        title: "Machine Learning",
        description:
          "Learn the fundamentals of machine learning algorithms and their applications.",
        image: "/images/courses/machine-learning-3.png",
        rating: 4.8,
        duration: "10h 15m",
        lessons: "15 Lessons",
        learners: "18K+ Learners",
        href: "/courses/machine-learning-applied",
        badge: { label: "trending topic", variant: "trending" },
        topic: "Machine Learning",
        technology: "Python",
        difficulty: "Intermediate",
        durationBand: "10–15 hours",
        track: "Data",
      },
      {
        id: "web-development-4",
        title: "Web Development",
        description:
          "Master front-end and back-end skills to create dynamic websites.",
        image: "/images/courses/cybersecurity.png",
        rating: "5.0",
        duration: "20h 30m",
        lessons: "25 Lessons",
        learners: "30K+ Learners",
        href: "/courses/web-development-backend",
        badge: { label: "Bestseller", variant: "bestseller" },
        topic: "Web Development",
        technology: "JavaScript",
        difficulty: "Beginner",
        durationBand: "15+ hours",
        track: "Product",
      },
    ],
    faqs: {
      heading: "Frequently Asked Questions",
      description:
        "Have questions about projects, difficulty levels, tools, or how to get started? Find your answers below.",
      items: [
        {
          question: "What are SkillVexa Projects?",
          answer:
            "SkillVexa Projects are practical, real-world challenges designed to help you apply what you've learned.",
        },
        {
          question: "Who can start a project?",
          answer:
            "Anyone on SkillVexa can start a project, including complete beginners looking to build a first portfolio piece.",
        },
        {
          question: "Do I need to complete a course before starting a project?",
          answer:
            "No. You can start whenever you feel ready, though finishing related lessons first is recommended.",
        },
        {
          question: "What technologies and skills can I practice?",
          answer:
            "Projects cover Python, JavaScript, SQL, cloud platforms, security tools, and more depending on the track.",
        },
        {
          question: "How long does it take to complete a project?",
          answer:
            "Most projects take 6–15 hours. The exact duration is listed on each project card.",
        },
        {
          question: "What does each project include?",
          answer:
            "Each project includes guided instructions, starter files or datasets, and a shareable portfolio outcome.",
        },
      ],
    },
  },
  courseDetails: {
    headline: "Introduction to Data and Data Science",
    heroDescription:
      "This data science fundamentals course is the perfect introduction to the field. Gain an overall understanding of data analysis, machine learning, and statistical techniques. Learn how data science helps businesses solve real-world problems",
    heroImage: "/images/course-details/hero.png",
    tags: [
      { label: "ONLINE COURSES", tone: "muted" },
      { label: "BESTSELLER", tone: "blue" },
    ],
    instructorsLine: ["Martin Ganchev", "Iliya Valchanov"],
    languages: "English, Urdu & Hindi",
    enrolled: "251,569 students already enrolled",
    overviewParagraphs: [
      "Are you looking for a well-structured data science fundamentals course? Do you want to gain a clear understanding of the data science field? This is the perfect course for you! If terms like ‘traditional data,’ ‘big data,’ ‘business intelligence,’ ‘business analytics,’ ‘data analytics,’ ‘data science,’ and ‘machine learning’ sound confusing, then taking this data science fundamentals course will help you understand the meaning and practical application of these concepts—making you proficient in the language of data.",
      "These skills can boost anyone's career. We live in the age of AI, but few people realize that data science fundamentals are the foundation upon which AI is built. This course is suitable for aspiring data analysts and data scientists. Still, it’s also highly recommended for business executives and professionals to enhance their understanding of data-driven decision-making. Embark on a journey through the various domains of data science—exploring the connections among them for a comprehensive understanding of the field. You’ll soon comprehend the business and analytical motivations behind....",
    ],
    cpeCredits: "06",
    fieldOfStudy: "Information Technology",
    deliveryMethod: "QAS Self Study",
    learnItems: [
      "Acquire a clear overview of modern data science fundamentals.",
      "Explore the role of machine learning in predictive analytics.",
      "Understand the importance of data visualization in communication.",
      "Examine the ethical implications of AI in decision-making.",
      "Get familiar with popular programming languages used in data science.",
      "Learn about the different types of data and their applications.",
    ],
    topics: [
      "Theory",
      "Data Analysis",
      "Programming",
      "Career Development",
      "Data Literacy",
    ],
    instructor: {
      name: "Iliya Valchanov",
      firstName: "Iliya",
      role: "CEO of Team-GPT | AI Educator | Co-founder of 365 Data Science & 3veta",
      image: "/images/course-details/instructor.png",
      linkedin: "https://linkedin.com",
    },
    curriculumStats: {
      lessons: "25 lessons",
      exercises: "57 exercises",
      exams: "4 exams",
    },
    curriculumIntro:
      "Are you looking for a well-structured data science fundamentals course? Do you want to gain a clear understanding of the data science field? This is the perfect course for you! If terms like ‘traditional data,’ ‘big data,’ ‘business intelligence,’ ‘business analytics,’ ‘data analytics,’ ‘data science,’ and ‘machine learning’ sound confusing, then taking this data science fundamentals course will help you understand the meaning and practical application of these concepts—making you proficient in the language of data.",
    curriculum: [
      {
        title: "The Different Data Science Fields",
        open: true,
        lessons: [
          { title: "Course Introduction", icon: "play" },
          { title: "Module 1: Basics of Design", icon: "play" },
          { title: "Module 2: Advanced Techniques", icon: "play" },
          { title: "Workshop: Hands-On Projects", icon: "play" },
          { title: "Guest Speaker Session", icon: "play" },
          { title: "Exercise", icon: "pin" },
        ],
      },
      { title: "Machine Learning and Algorithms", lessons: [] },
      { title: "Deep Learning and Neural Networks", lessons: [] },
      { title: "Natural Language Processing", lessons: [] },
      { title: "Data Visualization Techniques", lessons: [] },
      { title: "Big Data Analytics", lessons: [] },
    ],
    certificates: {
      heading: "Accredited Certificates",
      paragraphs: [
        "Craft a resume and LinkedIn profile you’re proud of—featuring certificates recognized by leading global institutions.",
        "Earn CPE-accredited credentials that showcase your dedication, growth, and essential skills—the qualities employers value most.",
      ],
      images: [
        "/images/course-details/certificate-1.png",
        "/images/course-details/certificate-2.png",
      ],
    },
    howItWorks: {
      heading: "How It Works",
      tabs: [
        {
          id: "lesson",
          label: "Lesson",
          title: "Lesson",
          body: "Learn through short, simple lessons—no prior experience in AI or data science needed.",
          image: "/images/course-details/preview-2.png",
        },
        {
          id: "exercises",
          label: "Exercises",
          title: "Exercises",
          body: "Apply each concept immediately with interactive exercises that reinforce what you just learned.",
          image: "/images/course-details/preview-1.png",
        },
        {
          id: "projects",
          label: "Projects",
          title: "Projects",
          body: "Build portfolio-ready projects that prove you can use these skills in real-world scenarios.",
          image: "/images/course-details/preview-2.png",
        },
        {
          id: "exams",
          label: "Practice exams",
          title: "Practice exams",
          body: "Check your understanding with practice exams designed to prepare you for certification.",
          image: "/images/course-details/preview-1.png",
        },
        {
          id: "interviews",
          label: "AI mock interviews",
          title: "AI mock interviews",
          body: "Practice job interviews with AI so you can talk about your skills with confidence.",
          image: "/images/course-details/preview-2.png",
        },
      ],
    },
  },
  interviewSimulator: {
    hero: {
      title: "Land Your Dream Job with Interview ACE",
      description:
        "No more rambling or being caught off-guard by unexpected interview questions. Our customized HR and technical interview simulator with instant feedback helps you overcome interview anxiety and ensures you stand out in your next job interview.",
      subtitle:
        "Open AI-powered tool for mock interview practice with speech-to-text.",
      cta: { label: "Start Interview Now", href: "/career-kit/interview-simulator/start" },
      image: "/images/interview/hero.png",
    },
    companies: {
      heading: "Practice Interviews for Top-Tier Companies",
      description:
        "Are you seeking to land a job with top-tier companies like Amazon, Meta, Google, or Apple? Our AI-powered interview prep tool trains you with an extensive library of questions taken directly from the interview process of 55 leading organizations.",
      logos: Array.from({ length: 16 }, (_, index) => ({
        src: `/images/interview/logos/logo-${String(index + 1).padStart(2, "0")}.png`,
        alt: `Company logo ${index + 1}`,
      })),
    },
    video: {
      src: "/images/interview/video-cover.png",
      playIcon: "/images/interview/play.svg",
    },
    stats: {
      heading: "Train with authentic interview questions for",
      items: [
        { value: "10", label: "Data Science Roles" },
        { value: "20+", label: "Industries" },
        { value: "55", label: "Leading Companies" },
      ],
    },
    howItWorks: {
      heading: "How Does InterviewAce Work?",
      cta: { label: "Start Interview Now", href: "/career-kit/interview-simulator/start" },
      image: "/images/interview/how-it-works.png",
      steps: [
        {
          number: "01",
          title: "Fill in the Questionnaire",
          description:
            "Customize your interview for better results by selecting or manually typing the role, company, and industry you’re applying for.",
        },
        {
          number: "02",
          title: "Review Your Responses",
          description:
            "Take a moment to go over your answers to ensure they accurately reflect your experiences and skills.",
        },
        {
          number: "03",
          title: "Research the Company",
          description:
            "Gather insights about the company culture, values, and recent news to tailor your responses and show genuine interest.",
        },
        {
          number: "04",
          title: "Prepare Questions to Ask",
          description:
            "Think of thoughtful questions to ask the interviewer that demonstrate your engagement and curiosity about the role.",
        },
      ],
    },
    gains: {
      heading: "What will you gain?",
      items: [
        {
          title: "Know What to Expect and Prepare",
          description:
            "Understand the standard interview questions and scenarios, ensuring you're always one step ahead in your preparation.",
          icon: "/images/interview/gain-1.svg",
        },
        {
          title: "Master Response Delivery",
          description:
            "Learn to deliver responses with clarity, confidence, and appropriate tone, making a lasting impression on your interviewers.",
          icon: "/images/interview/gain-2.svg",
        },
        {
          title: "Boost Your Speaking Confidence",
          description:
            "Understand the standard interview questions and scenarios, ensuring you're always one step ahead in your preparation.",
          icon: "/images/interview/gain-3.svg",
        },
        {
          title: "Practice Anytime, Anywhere, for Free",
          description:
            "Understand the standard interview questions and scenarios, ensuring you're always one step ahead in your preparation.",
          icon: "/images/interview/gain-4.svg",
        },
        {
          title: "Prepare for Your Dream Job",
          description:
            "Learn to deliver responses with clarity, confidence, and appropriate tone, making a lasting impression on your interviewers.",
          icon: "/images/interview/gain-5.svg",
        },
        {
          title: "Get Hired Faster",
          description:
            "Understand the standard interview questions and scenarios, ensuring you're always one step ahead in your preparation.",
          icon: "/images/interview/gain-6.svg",
        },
      ],
    },
    cta: {
      heading: "Prep Now for a Better Tomorrow!",
      description:
        "Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.",
    },
  },
  finalCta: {
    headingLead: "Your Next",
    headingAccent: "Skill Starts",
    headingEnd: "Here",
    description:
      "Build real-world skills, follow personalized career paths, and prepare for the opportunities of tomorrow all in one place.",
    primaryCta: { label: "Start Learning Free", href: "/get-started" },
    secondaryCta: { label: "Explore Career Paths", href: "/career-paths" },
  },
};

export function getCourseSlug(course) {
  const href = course.href || "";
  if (href.startsWith("/courses/")) {
    return href.slice("/courses/".length);
  }
  return course.id;
}

export function getAllCourses() {
  const byId = new Map();
  siteConfig.coursesPage.catalog.forEach((course) => byId.set(course.id, course));
  siteConfig.courses.items.forEach((course) => {
    if (!byId.has(course.id)) byId.set(course.id, course);
  });
  return Array.from(byId.values());
}

export function getCourseDetails(slug) {
  const course = getAllCourses().find(
    (item) => item.id === slug || getCourseSlug(item) === slug
  );
  if (!course) return null;

  const details = siteConfig.courseDetails;
  const isFeatured = course.id === "python-data-science";

  return {
    ...details,
    ...course,
    headline: isFeatured ? details.headline : course.title,
    heroImage: isFeatured ? details.heroImage : course.image,
    heroDescription: isFeatured ? details.heroDescription : course.description,
    enrolled: isFeatured ? details.enrolled : undefined,
    previewImage: "/images/course-details/preview-1.png",
  };
}

export function getCareerPathNavItems() {
  return siteConfig.nav.find((item) => item.href === "/career-paths")?.children || [];
}

export function getCareerPathSlug(item) {
  return String(item.href || "")
    .split("/")
    .filter(Boolean)
    .pop();
}

const careerPathExtras = {
  "data-analyst": {
    salary: "$91,000",
    growth: "12%",
    hours: "56 hours",
    skillLevel: "Basic",
    coursesCount: "10",
    responsibilities:
      "Collect, clean, and analyze data to uncover insights and support business decisions",
    skills:
      "SQL, Excel, Python or R, Tableau, Power BI, Statistics, Data Visualization, Data Cleaning",
    skillTools: [
      "Excel for data analysis and reporting",
      "Statistics and data-driven decision-making",
      "SQL and relational databases",
      "Python programming",
      "Data cleaning and preprocessing with pandas and NumPy",
      "Data visualization with Python, R, Tableau, and Excel",
    ],
  },
  "data-scientist": {
    salary: "$174,195",
    growth: "36%",
    hours: "69 hours",
    skillLevel: "Advanced",
    coursesCount: "10",
    responsibilities:
      "Lead machine learning projects from strategy to deployment and communicate advanced models",
    skills: "Python, statistics, machine learning, deep learning, SQL, communication",
  },
  "machine-scientist": {
    salary: "$141,000",
    growth: "28%",
    hours: "29 hours",
    skillLevel: "Advanced",
    coursesCount: "10",
    responsibilities:
      "Research and develop algorithms that enable machines to learn from data",
    skills: "Python, NLP, deep learning, model training, evaluation, optimization",
  },
  "data-sceintist": {
    salary: "$88,000",
    growth: "36%",
    hours: "69 hours",
    skillLevel: "Intermediate",
    coursesCount: "10",
    responsibilities:
      "Develop algorithms and models to analyze large datasets for predictive analytics",
    skills: "Python, SQL, statistics, machine learning, data wrangling, visualization",
  },
  "tableau-developer": {
    salary: "$97,544",
    growth: "18%",
    hours: "32 hours",
    skillLevel: "Intermediate",
    coursesCount: "8",
    responsibilities:
      "Design interactive dashboards that make data visually accessible to decision-makers",
    skills: "Tableau, data modeling, dashboard design, SQL, visual storytelling",
  },
  "ai-engineer": {
    salary: "$119,000",
    growth: "32%",
    hours: "48 hours",
    skillLevel: "Intermediate",
    coursesCount: "10",
    responsibilities:
      "Build scalable AI solutions at the intersection of software engineering and data science",
    skills: "Python, machine learning, APIs, LLMs, cloud, software engineering",
  },
  "buisness-analyst": {
    salary: "$86,122",
    growth: "14%",
    hours: "40 hours",
    skillLevel: "Basic",
    coursesCount: "8",
    responsibilities:
      "Bridge IT and business by analyzing processes and systems to improve efficiency",
    skills: "Excel, SQL, requirements gathering, process mapping, Power BI, communication",
  },
  "power-bi-developer": {
    salary: "$106,000",
    growth: "20%",
    hours: "34 hours",
    skillLevel: "Intermediate",
    coursesCount: "8",
    responsibilities:
      "Build data models and reports that help organizations monitor performance and trends",
    skills: "Power BI, DAX, data modeling, SQL, dashboard design",
  },
  "ai-agent-engineer": {
    salary: "$111,000",
    growth: "40%",
    hours: "42 hours",
    skillLevel: "Advanced",
    coursesCount: "9",
    responsibilities:
      "Design autonomous AI agents that can reason, plan, and act across digital environments",
    skills: "Python, LLMs, orchestration, software engineering, machine learning",
  },
  "senior-data-scientist": {
    salary: "$174,195",
    growth: "36%",
    hours: "72 hours",
    skillLevel: "Advanced",
    coursesCount: "12",
    responsibilities:
      "Lead AI strategy, mentor teams, and ship production-grade machine learning systems",
    skills: "Python, MLOps, neural networks, leadership, experimentation, cloud",
  },
  "data-engineer": {
    salary: "$121,000",
    growth: "22%",
    hours: "52 hours",
    skillLevel: "Intermediate",
    coursesCount: "9",
    responsibilities:
      "Build and maintain infrastructure for data generation, keeping data accessible and reliable",
    skills: "SQL, Python, Spark, cloud warehouses, pipelines, data modeling",
  },
  "quant-finance-analyst": {
    salary: "$153,000",
    growth: "16%",
    hours: "58 hours",
    skillLevel: "Advanced",
    coursesCount: "10",
    responsibilities:
      "Work with financial datasets to forecast prices, model risk, and design trading strategies",
    skills: "Python, econometrics, time series, statistics, machine learning, finance",
  },
};

export function getAllCareerPaths() {
  return getCareerPathNavItems().map((item) => getCareerPath(getCareerPathSlug(item))).filter(Boolean);
}

export function getCareerPath(slug) {
  const item = getCareerPathNavItems().find((entry) => getCareerPathSlug(entry) === slug);
  if (!item) return null;

  const extra = careerPathExtras[slug] || {};
  const title = extra.title || item.label;
  const role = title.replace(/\s+/g, " ").trim();
  const roleLower = role.toLowerCase();
  const roleArticle = /^[aeiou]/i.test(role) ? "an" : "a";

  return {
    ...item,
    slug,
    title: role,
    roleLower,
    roleArticle,
    headline: extra.headline || `How to become ${roleArticle} ${role}`,
    badge: `ONLINE ${role} CERTIFICATION`,
    trackLabel: "CAREER TRACK",
    description:
      extra.description ||
      `Launch your ${roleLower} career path—get job-ready with expert-led courses, hands-on projects, and an accredited certification that sets you apart.`,
    salary: extra.salary || "$91,000",
    growth: extra.growth || "12%",
    hours: extra.hours || "56 hours",
    skillLevel: extra.skillLevel || "Basic",
    coursesCount: extra.coursesCount || "10",
    cpeCredits: "06",
    rating: "4.9",
    responsibilities:
      extra.responsibilities ||
      "Collect, clean, and analyze data to uncover insights and support business decisions",
    skills:
      extra.skills ||
      "SQL, Excel, Python or R, Tableau, Power BI, Statistics, Data Visualization, Data Cleaning",
    skillTools:
      extra.skillTools ||
      (extra.skills || "SQL, Excel, Python, Statistics, Data Visualization")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    companiesLabel: `Top companies for ${role}`,
    jobTitle: `${role} job`,
    heroImage: extra.heroImage || "/images/career-path/hero.png",
    previewImage: extra.previewImage || "/images/career-path/job-preview.png",
  };
}
