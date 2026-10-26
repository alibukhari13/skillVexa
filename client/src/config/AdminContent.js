// Hand-written content for the SkillVexa admin area (/admin): career-track details,
// gamification (XP / coins), community samples, onboarding, pricing and exams.
// Course, track and project lists live in DashboardData.js.

import { dashboardCourses, dashboardProjects, dashboardTracks } from "@/config/DashboardData";

/* ----------------------------- Lookups ----------------------------- */

export const courseById = Object.fromEntries(dashboardCourses.map((course) => [course.id, course]));
export const trackById = Object.fromEntries(dashboardTracks.map((track) => [track.id, track]));
export const projectById = Object.fromEntries(dashboardProjects.map((project) => [project.id, project]));

function hoursOf(duration) {
  return parseInt(duration, 10) || 0;
}

/* -------------------------- Career tracks -------------------------- */

const trackDetails = {
  "ai-engineer": {
    level: "Intermediate",
    summary: "Build production-ready AI features—from Python foundations to LLM apps and vector search.",
    overview: [
      "AI engineers sit between software development and data science. They take models out of notebooks and turn them into reliable products people actually use.",
      "This track starts with Python and data handling, then moves to language models, LangChain apps and vector databases, so every course adds a skill you will use on the job.",
    ],
    skills: ["Python for AI projects", "Cleaning and preparing data with pandas", "Natural language processing basics", "Working with large language models", "Building chat apps with LangChain", "Vector databases and retrieval"],
  },
  "data-scientist": {
    level: "Intermediate",
    summary: "Go from statistics and Python to machine learning and deep learning models.",
    overview: [
      "Data scientists turn raw data into predictions and decisions. The role mixes math, programming and a solid understanding of the business problem.",
      "The track builds that mix in order: probability and statistics first, then SQL and Python, then machine learning and neural networks with TensorFlow.",
    ],
    skills: ["Statistics and probability", "Mathematics for data science", "SQL for analysis", "Python programming", "Machine learning in Python", "Deep learning with TensorFlow"],
  },
  "data-analyst": {
    level: "Basic",
    summary: "Learn Excel, SQL, Python and visualization—the core toolkit employers ask for.",
    overview: [
      "Most people starting in data are not stuck on learning—they are stuck on knowing what to learn next. This track removes that guesswork.",
      "You follow a clear order of courses, practise every skill with exercises and projects, and finish with a portfolio and a certificate you can show employers.",
    ],
    skills: ["Excel for analysis and reporting", "Statistics for decision-making", "SQL and relational databases", "Python programming", "Data cleaning with pandas and NumPy", "Visualization with Python, R, Tableau and Excel"],
  },
  "power-bi-developer": {
    level: "Basic",
    summary: "Model data, write DAX and publish Power BI reports that teams rely on.",
    overview: [
      "Power BI developers give teams one trusted place to watch their numbers. They connect sources, model the data and design reports that answer real questions.",
      "You will learn Power Query, data modelling and DAX, then practise building business reports and presenting KPIs clearly.",
    ],
    skills: ["Power BI fundamentals", "Power Query and data modelling", "DAX measures", "Business report design", "KPI selection", "Presenting insights"],
  },
  "tableau-developer": {
    level: "Basic",
    summary: "Design interactive Tableau dashboards backed by clean SQL data.",
    overview: [
      "Tableau developers make data easy to explore. Good dashboards let people find answers on their own instead of waiting for a report.",
      "The track pairs Tableau with SQL so you can prepare your own data, then walks through real dashboard projects on churn, engagement and growth.",
    ],
    skills: ["Tableau fundamentals", "SQL for dashboard data", "Churn and engagement analysis", "Funnel and sign-up analysis", "Growth metrics", "Dashboard storytelling"],
  },
  "senior-data-analyst": {
    level: "Advanced",
    summary: "Lead analyses end to end—advanced SQL, A/B testing and growth analytics.",
    overview: [
      "Senior analysts own the question, not just the query. They choose the right method, check the results and explain what the business should do next.",
      "This track sharpens advanced SQL, experimentation and growth analysis, and adds the communication skills needed to influence decisions.",
    ],
    skills: ["Advanced SQL", "A/B testing in Python", "Customer churn and engagement", "Growth analysis", "Data-driven business growth", "Presenting to stakeholders"],
  },
  "data-engineer": {
    level: "Intermediate",
    summary: "Build reliable pipelines, warehouses and cloud data infrastructure.",
    overview: [
      "Data engineers make sure the right data is in the right place at the right time. Every analyst and data scientist depends on their work.",
      "You will learn data architecture, SQL for engineering, ingestion with pandas, cloud basics and orchestration with Apache Airflow.",
    ],
    skills: ["Data engineering fundamentals", "Data architecture", "Advanced SQL for engineers", "Data ingestion", "Cloud computing basics", "Pipelines with Apache Airflow"],
  },
  "business-analyst": {
    level: "Basic",
    summary: "Connect business questions to data with Excel, statistics and visualization.",
    overview: [
      "Business analysts translate between teams. They understand what the business needs and use data to show which option works best.",
      "The track covers data literacy and strategy, Excel from basics to advanced, statistics and visualization—everything needed to support decisions.",
    ],
    skills: ["Data literacy", "Data strategy", "Excel and pivot tables", "Advanced Excel", "Statistics", "Data visualization"],
  },
  "machine-learning-scientist": {
    level: "Advanced",
    summary: "Master the algorithms behind machine learning and how to evaluate them.",
    overview: [
      "Machine learning scientists design and improve the models themselves. They know why an algorithm works and when it will fail.",
      "Starting from linear algebra and the math behind ML, you will implement Naïve Bayes, KNN, trees, SVMs and the full machine learning process.",
    ],
    skills: ["Linear algebra and feature selection", "Math for machine learning", "Machine learning in Python", "Classification algorithms", "Tree-based models", "The end-to-end ML process"],
  },
  "senior-data-scientist": {
    level: "Advanced",
    summary: "Lead ML projects with deep learning, CNNs and a strong product mindset.",
    overview: [
      "Senior data scientists guide projects from idea to production and mentor others along the way.",
      "The track deepens your algorithm knowledge, adds deep learning with PyTorch and TensorFlow, and shows how to apply ML to real business problems.",
    ],
    skills: ["Thinking like a data scientist", "Machine learning algorithms A-Z", "Business applications of ML", "ChatGPT for data science", "Deep learning with PyTorch", "Convolutional neural networks"],
  },
  "ai-agent-engineer": {
    level: "Advanced",
    summary: "Design, build and evaluate AI agents that plan, use tools and act.",
    overview: [
      "AI agents go beyond chat—they can plan, call tools and complete multi-step tasks. Building them well needs both engineering and careful evaluation.",
      "You will learn agent architecture, MCPs, LangChain and LangGraph memory, and how to measure whether an agent is actually doing its job.",
    ],
    skills: ["AI fundamentals", "Agent architecture", "Model Context Protocol (MCP)", "Chat apps with LangChain", "Agent memory with LangGraph", "Evaluating AI agents"],
  },
  "quant-finance-analyst": {
    level: "Advanced",
    summary: "Model risk, forecast markets and apply machine learning to finance.",
    overview: [
      "Quant analysts use math and code to price risk and find signals in financial data.",
      "The track covers finance math, econometrics and time series, then credit risk modelling and modern ML methods used in finance.",
    ],
    skills: ["Math for finance", "Python and NumPy", "Econometrics", "Time series analysis", "Credit risk modelling", "Machine learning in finance"],
  },
};

export function getTrackDetails(id) {
  const track = trackById[id];
  if (!track) return null;
  const extra = trackDetails[id] || {};
  const courses = track.courses.map((courseId) => courseById[courseId]).filter(Boolean);
  const hours = courses.reduce((sum, course) => sum + hoursOf(course.duration), 0);
  return {
    ...track,
    ...extra,
    courses,
    hours,
    courseCount: courses.length + 2,
    // The first course in every track is an optional introduction; the rest are required.
    curriculum: courses.map((course, index) => ({ course, optional: index === 0 })),
  };
}

/* ----------------------------- Courses ----------------------------- */

const introCurriculum = [
  { title: "The Different Data Science Fields", duration: "42 min", items: [
    ["lesson", "Course Introduction", "02:30", true], ["lesson", "Why are there so many business and data science buzzwords?", "05:21"], ["exercise", "Exercise", "2 questions"],
    ["lesson", "Analysis vs Analytics", "03:50"], ["exercise", "Exercise", "3 questions"],
    ["lesson", "Intro to Business Analytics, Data Analytics, and Data Science", "06:39", true], ["exercise", "Exercise", "3 questions"],
    ["lesson", "Adding BI, Machine Learning, and AI to the picture", "09:11", true], ["exercise", "Exercise", "4 questions"],
    ["lesson", "Traditional AI vs. Generative AI", "04:44", true], ["exercise", "Exercise", "1 question"],
    ["lesson", "More Examples of Generative AI", "05:10", true], ["exercise", "Exercise", "1 question"],
    ["lesson", "An Overview of our Data Science Infographic", "04:03", true], ["exercise", "Exercise", "4 questions"],
  ] },
  { title: "The Relationship between Different Data Science Fields", duration: "7 min", items: [
    ["lesson", "When are Traditional data, Big Data, BI, Traditional Data Science and ML applied?", "07:19", true], ["exercise", "Exercise", "2 questions"],
  ] },
  { title: "What is the Purpose of each Data Science field", duration: "4 min", items: [
    ["lesson", "Why do we Need each of these Disciplines?", "03:46"], ["practice", "Practice exam: 1", "1 case / 6 questions"], ["exercise", "Exercise", "1 question"],
  ] },
  { title: "Common Data Science Techniques", duration: "60 min", items: [
    ["lesson", "Traditional Data: Techniques", "08:13"], ["exercise", "Exercise", "1 question"], ["lesson", "Traditional Data: Real-life Examples", "01:44"],
    ["lesson", "Big Data: Techniques", "04:26"], ["lesson", "Big Data: Real-life Examples", "01:32"], ["exercise", "Exercise", "2 questions"],
    ["lesson", "Business Intelligence (BI): Techniques", "06:45"], ["exercise", "Exercise", "4 questions"], ["lesson", "Business Intelligence (BI): Real-life Examples", "01:42"],
    ["lesson", "Traditional Methods: Techniques", "09:08"], ["exercise", "Exercise", "7 questions"], ["lesson", "Traditional Methods: Real-life Examples", "03:55"],
    ["lesson", "Machine Learning (ML): Techniques", "06:55"], ["lesson", "Machine Learning (ML): Types of Machine Learning", "08:05"], ["exercise", "Exercise", "5 questions"],
    ["lesson", "Machine Learning (ML): Real-life Examples", "02:11"], ["practice", "Practice exam: 2", "1 case / 6 questions"], ["exercise", "Exercise", "3 questions"],
  ] },
  { title: "Common Data Science Tools", duration: "6 min", items: [
    ["lesson", "Programming Languages & Software Employed in Data Science", "05:51"], ["exercise", "Exercise", "5 questions"],
  ] },
  { title: "Data Science Job Positions: What do they Involve?", duration: "3 min", items: [
    ["lesson", "Data Science Job Positions: What do they Involve and What to Look out for?", "03:29"], ["exercise", "Exercise", "2 questions"],
  ] },
  { title: "Dispelling common Misconceptions", duration: "4 min", items: [
    ["lesson", "Dispelling Common Misconceptions", "04:10"], ["practice", "Practice exam: 3", "1 case / 6 questions"], ["exercise", "Exercise", "2 questions"],
  ] },
  { title: "Course exam", duration: "30 min", items: [["exam", "Course exam", "4 cases / 24 questions"]] },
];

const genericSections = ["Getting Started", "Core Concepts", "Hands-on Practice", "Real-world Applications", "Wrapping Up"];

function buildGenericCurriculum(course) {
  const totalMinutes = Math.max(60, hoursOf(course.duration) * 60);
  const sectionCount = Math.min(genericSections.length, Math.max(3, Math.round(totalMinutes / 60) + 1));
  const lessonsPerSection = 3;
  const lessonMinutes = Math.max(3, Math.round(totalMinutes / (sectionCount * lessonsPerSection)));
  const sections = genericSections.slice(0, sectionCount).map((name, sectionIndex) => {
    const items = [];
    for (let i = 0; i < lessonsPerSection; i += 1) {
      const minutes = Math.max(2, lessonMinutes - i);
      const title = sectionIndex === 0 && i === 0 ? "Course Introduction" : `${name}: Part ${i + 1}`;
      items.push(["lesson", title, `${String(minutes).padStart(2, "0")}:${i % 2 ? "30" : "05"}`, i === 0]);
      if (i === 1) items.push(["exercise", "Exercise", `${2 + sectionIndex} questions`]);
    }
    if (sectionIndex === 1) items.push(["practice", "Practice exam: 1", "1 case / 6 questions"]);
    return { title: name, duration: `${lessonMinutes * lessonsPerSection} min`, items };
  });
  sections.push({ title: "Course exam", duration: "30 min", items: [["exam", "Course exam", "4 cases / 24 questions"]] });
  return sections;
}

export function getCourseCurriculum(course) {
  const raw = course.id === "introduction-to-data-and-data-science" ? introCurriculum : buildGenericCurriculum(course);
  let index = 0;
  return raw.map((section, sectionIndex) => ({
    ...section,
    number: sectionIndex + 1,
    items: section.items.map(([type, title, meta, resources]) => {
      const item = { id: `${type}-${index}`, index, type, title, meta: type === "lesson" ? `Lesson - ${meta} min` : meta, resources: Boolean(resources) };
      index += 1;
      return item;
    }),
  }));
}

export function getCourseDescription(course) {
  return `${course.title} with ${course.instructors}: ${course.duration} of video lessons, exercises and practice exams that build job-ready skills step by step.`;
}

/* ----------------------------- Projects ---------------------------- */

export function getProjectDetails(id) {
  const project = projectById[id];
  if (!project) return null;
  const tech = project.technologies.join(" and ");
  return {
    ...project,
    subtitle: `A hands-on ${project.topic.toLowerCase()} case built around real business data`,
    sections: [
      {
        title: "Case Description",
        body: [
          `In this ${project.type.toLowerCase()}, you step into the role of an analyst at a fast-growing online learning company. The product team has shipped new features and wants to know whether they changed how students learn.`,
          `Your job is to use ${tech} to explore the data, answer the team's questions and present clear, evidence-based recommendations.`,
        ],
      },
      {
        title: "Project requirements",
        body: [`You need ${tech} installed on your computer. Everything else—datasets, instructions and a solution walkthrough—is included in the project files.`],
      },
      {
        title: "Project files",
        body: ["The dataset has been anonymised to protect user privacy. You will receive the raw files, a short data dictionary and step-by-step tasks for the guided version of the project."],
      },
      {
        title: "Project tasks",
        list: ["Load and inspect the dataset", "Clean and prepare the data", "Answer the business questions", "Visualize your key findings", "Summarise your recommendations"],
      },
    ],
  };
}

/* ------------------------------ Exams ------------------------------ */

export const practiceQuestions = [
  {
    question: "A table stores Year as text values. What should you do before building a yearly revenue summary?",
    options: ["Convert Year to a date or number type", "Delete the Year column", "Sort the table by Revenue", "Rename the Country column"],
    answer: 0,
  },
  {
    question: "Which chart is usually best for comparing revenue across a handful of countries?",
    options: ["Pie chart with 20 slices", "Scatter plot", "Bar chart", "Word cloud"],
    answer: 2,
  },
  {
    question: "Gross profit is calculated as…",
    options: ["Revenue plus expenses", "Revenue minus cost of goods sold", "Net income divided by revenue", "Assets minus liabilities"],
    answer: 1,
  },
  {
    question: "You need total revenue per country per year. Which operation do you apply?",
    options: ["Filter out all countries", "Average the Year column", "Join the table to itself", "Group by country and year, then sum revenue"],
    answer: 3,
  },
  {
    question: "Which of these is a measure rather than a dimension?",
    options: ["Country", "Month", "Revenue", "Product name"],
    answer: 2,
  },
  {
    question: "Revenue grew from 200 to 250. What is the growth rate?",
    options: ["20%", "25%", "50%", "5%"],
    answer: 1,
  },
];

export function getPracticeExam(examId) {
  const [groupId, number] = String(examId).split("--");
  const examNumber = Number(number) || 1;
  return {
    id: examId,
    groupId,
    title: `Practice Exam: ${examNumber}`,
    durationSeconds: 15 * 60,
    caseText:
      "Gamma operates in four countries—USA, Canada, Mexico and Brazil. Use the Financials by country.xlsx file to build a summary of the company's performance over the last three years, for both Revenue and Gross profit.",
    attachment: "Financials by country.xlsx",
    questions: practiceQuestions,
  };
}

/* --------------------------- Gamification -------------------------- */

export const levelNames = [
  "Absolute beginner", "Beginner", "Explorer", "Apprentice", "Practitioner",
  "Skilled", "Advanced", "Expert", "Master", "World-class professional",
];

export const xpWays = [
  ["Complete your onboarding", "50 XP", "+2", "Start strong: finish onboarding and the guided tour so we can tailor SkillVexa to your goals."],
  ["Complete a lesson", "1 XP", null, "The simplest way to earn XP—finish a new video lesson."],
  ["Watch 30 minutes of content", "5 XP", null, "Watch at least 30 minutes of lessons to get a feel for how we teach."],
  ["Take a practice exam", "3 XP", null, "Practice makes perfect. Use practice exams to check what you know."],
  ["Complete the first 3 lessons in a course", "5 XP", null, "The first steps are the hardest—get through three lessons and keep going."],
  ["Watch all lessons in a course", "20 XP", "+2", "Finish every video in a course to earn a boost of XP and coins."],
  ["Pass a course exam", "25 XP", "+8", "Score above 60% on a course exam to earn extra XP and coins."],
  ["Enroll in a career track", "10 XP", null, "Prefer a structured path? Join a career track and collect bonus XP."],
  ["Select career track electives", "2 XP", null, "Choose your two elective courses after enrolling in a track."],
  ["Complete a Project", "X XP", null, "Harder projects pay more. Your reward also depends on the approach you pick and your quiz score."],
  ["Take a career track exam", "10 XP", null, "Unlocking the final exam is worth celebrating on its own."],
  ["Pass a career track exam", "150 XP", "+50", "Pass the final exam of a career track for the biggest reward on the platform."],
  ["Get your Q&A answer upvoted", "1 XP", null, "Help other learners in the Q&A Hub and earn XP when they upvote your answers."],
  ["Keep up with your daily learning goal", "5 XP", null, "Hit your daily goal and get rewarded for the habit."],
  ["Extend your current streak", "50 XP", "+5", "Longer streaks bring more XP and coins—and get you to level 10 faster."],
  ["Achieve your weekly learning goal", "25 XP", "+15", "Meet your daily goal every day of the week for an extra boost."],
  ["Meet a deadline", "10 XP", null, "Finish learning path items on time. Available in automatic mode only."],
  ["Fill in your resume", "50 XP", "+1", "Complete your resume so employers can discover you."],
  ["Card Benefit", "X XP", "+X", "Some collectible cards reward you with XP and coins—choose wisely."],
];

export const coinWays = [
  ["Complete your onboarding", "50 XP", "+2", "Start strong: finish onboarding and the guided tour so we can tailor SkillVexa to your goals."],
  ["Watch all lessons in a course", "20 XP", "+2", "Finish every video in a course to earn a boost of XP and coins."],
  ["Pass a course exam", "25 XP", "+8", "Score above 60% on a course exam to earn extra XP and coins."],
  ["Pass a career track exam", "150 XP", "+50", "Pass the final exam of a career track for the biggest reward on the platform."],
  ["Extend your current streak", "50 XP", "+5", "Longer streaks bring more XP and coins—and get you to level 10 faster."],
  ["Achieve your weekly learning goal", "25 XP", "+15", "Meet your daily goal every day of the week for an extra boost."],
  ["Level Up", null, "+X", "Every new level brings coins you can spend on collectible cards."],
  ["Weekly League Winner", null, "+X", "Finish at the top of your weekly league to win bonus coins."],
  ["Fill in your resume", "50 XP", "+1", "Complete your resume so employers can discover you."],
  ["Card Benefit", "X XP", "+X", "Some collectible cards reward you with XP and coins—choose wisely."],
  ["Referrals", null, "+X", "Invite friends to SkillVexa and earn coins for every friend who joins."],
];

export const coinUses = [
  { title: "Buy collectable cards with coins", body: "Spend coins on card collections and unlock their benefits.", cta: "Explore card collections", href: "/admin/card-collections" },
  { title: "Take a break from learning", body: "A Freeze Streak protects your streak on the days you can't study.", cta: "Go to dashboard", href: "/admin" },
];

export const dailyGoals = [
  { minutes: 30, title: "Keep it laid-back and earn", xp: "3 XP/day" },
  { minutes: 45, title: "Become an expert and earn", xp: "4 XP/day" },
  { minutes: 60, title: "Master your craft and earn", xp: "5 XP/day" },
];

export const leaderboardFaq = [
  ["What is the SkillVexa Leaderboard?", "The Leaderboard lets you compare your weekly progress with other learners. There are ten leagues with 30 ranks each, and your weekly XP decides your rank. Each week you can move up a league, drop down, or stay where you are. It is available on paid plans only."],
  ["When do ranks get updated?", "Every Sunday at 23:59 UTC. Everyone taking part who earned XP in the last two weeks gets a new rank based on their weekly XP compared with others in the same league."],
  ["How do I enter a higher league?", "Finish in the top five of your league for the week. You move up a league the following Monday and win a prize that grows with every league you climb."],
  ["Can I lose my spot in my current league?", "Yes. If you finish in the bottom five for the week, you drop to the league below on Monday—and get another chance to climb back up."],
  ["What happens if two learners have the same weekly XP?", "Ties are broken by Overall XP, then Streak, then minutes watched—in that order."],
  ["Can you drop out of the leaderboard completely?", "No. The first league is the floor, so even a bottom-five finish there keeps you in the Leaderboard."],
  ["Why am I temporarily excluded from the Leaderboard?", "If you earned no XP last week and none so far this week, you are paused until you earn your next XP. As soon as you do, you are ranked again."],
];

export const referralRewards = [
  { place: "1st", perks: ["50% OFF ANNUAL PLAN", "FREE MONTH"], coins: "+30" },
  { place: "2nd", perks: ["FREE MONTH"], coins: "+45" },
  { place: "3rd", perks: ["FREE MONTH"], coins: "+60" },
  { place: "4th", perks: ["FREE MONTH"], coins: "+75" },
  { place: "5th", perks: ["LIFETIME ACCESS"], coins: null },
  { place: "6th+", perks: [], coins: "+100" },
];

/* --------------------------- Card collections ---------------------- */

export const cardCollections = [
  {
    id: "mathematics",
    title: "Pioneers of Mathematics",
    requirement: null,
    benefit: "60% Discount on Annual Plan",
    benefitBody: "Collect all four cards to unlock a full year of SkillVexa at 60% off.",
    gradient: "from-[#2563EB] to-[#7C3AED]",
    cards: [
      { name: "Carl Friedrich Gauss", benefit: "Video greeting", task: "Complete a lesson" },
      { name: "Archimedes", benefit: "+ 3 coins", task: "Watch 30 minutes of content" },
      { name: "Leonhard Euler", benefit: "3 Freeze streaks", task: "Take a practice exam" },
      { name: "Hypatia", benefit: "Win up to 50 XPs", task: "Complete the first 3 lessons in a course" },
    ],
  },
  { id: "statistics", title: "Pioneers of Statistics", requirement: "Level 3 required", gradient: "from-[#0EA5E9] to-[#2563EB]", cards: [{ name: "Ronald Fisher" }, { name: "Florence Nightingale" }, { name: "Karl Pearson" }, { name: "Thomas Bayes" }] },
  { id: "geometry", title: "Pioneers of Geometry", requirement: "Level 4 required", gradient: "from-[#F59E0B] to-[#EF4444]", cards: [{ name: "Euclid" }, { name: "René Descartes" }, { name: "Bernhard Riemann" }, { name: "Pythagoras" }] },
  { id: "algebra", title: "Pioneers of Algebra", requirement: "Level 6 required", gradient: "from-[#10B981] to-[#0EA5E9]", cards: [{ name: "Al-Khwarizmi" }, { name: "Emmy Noether" }, { name: "Évariste Galois" }, { name: "Niels Henrik Abel" }] },
  { id: "calculus", title: "Pioneers of Calculus", requirement: "Premium users only", gradient: "from-[#8B5CF6] to-[#EC4899]", cards: [{ name: "Isaac Newton" }, { name: "Gottfried Leibniz" }, { name: "Augustin-Louis Cauchy" }, { name: "Maria Agnesi" }] },
  { id: "computer-science", title: "Pioneers of Computer Science", requirement: "Premium users only", gradient: "from-[#0F172A] to-[#2563EB]", cards: [{ name: "Ada Lovelace" }, { name: "Alan Turing" }, { name: "Grace Hopper" }, { name: "John von Neumann" }] },
];

/* ------------------------------ Community -------------------------- */

export const sampleQuestions = [
  { id: "code-skeleton-mistake", author: "Hamza R.", badge: "Super learner", votes: 0, answers: 0, title: "Section 5: the second coding exercise has a typo in the starter code", excerpt: "The last step in the starter code mentions the expected value, but it doesn't match what the solution video shows…", course: "Introduction to R Programming", lastAnswered: null, views: 3 },
  { id: "mysql-workbench-chromebook", author: "Sara K.", votes: 0, answers: 1, title: "Installing MySQL Workbench on a Chromebook", excerpt: "Is there a way to install MySQL Workbench on ChromeOS, or should I use an online alternative?", course: "SQL", lastAnswered: "6 days ago", views: 11 },
  { id: "mcp-lecture-link", author: "Daniyal A.", votes: 0, answers: 1, title: "Link from the MCP Principles lecture is not working", excerpt: "At 1:27 the instructor shares a website, but it doesn't load for me. Is there an updated link?", course: "MCPs for Everyone: Supercharge Your AI Tooling Skills", lastAnswered: "10 days ago", views: 14 },
  { id: "missing-prompts", author: "Ayesha M.", badge: "Super learner", votes: 0, answers: 1, title: "Where can I find the prompt files used in the course?", excerpt: "The course says the prompts are in text files, but I can't find them in the resources section…", course: "Intro to Claude Code for Data Analysis", lastAnswered: "Sep 2nd 2026", views: 10 },
  { id: "jupyter-new-file", author: "Bilal H.", votes: 0, answers: 1, title: "Resolved: 'Failed to fetch' every time I create a new file", excerpt: "Every time I try to make a new notebook I get this error. Restarting didn't help.", course: "Introduction to Jupyter", lastAnswered: "Aug 31st 2026", views: 157 },
  { id: "vs-code-instead-of-spyder", author: "Usman T.", votes: 0, answers: 0, title: "Can I use VS Code instead of Spyder?", excerpt: "I'm already comfortable with VS Code. Will I miss anything if I follow the course there?", course: "Python Programmer Bootcamp", lastAnswered: null, views: 5 },
  { id: "excel-vs-python", author: "Usman T.", votes: 0, answers: 0, title: "Advice needed: balancing Excel and Python", excerpt: "I just finished Python, NumPy and pandas. Should I still spend time on advanced Excel?", course: "Statistics", lastAnswered: null, views: 142 },
];

export const popularQuestions = [
  { author: "Nadia F.", votes: 28, answers: 5, title: "Why does predict() return a single value instead of an array?" },
  { author: "Omar S.", votes: 23, answers: 6, title: "ROLLBACK isn't working when I follow the lesson step by step" },
  { author: "E. K.", votes: 13, answers: 4, title: "I didn't understand the part from 3:48 to the end" },
];

export const channels = [
  { id: "general", name: "general", joined: true, body: "General conversation for students, instructors and moderators, plus official SkillVexa announcements. Keep topics related to data and AI—use #random for everything else." },
  { id: "platform", name: "platform", joined: true, body: "News about course launches, new platform features and questions that the Help Center doesn't answer." },
  { id: "career-related", name: "career-related", joined: true, body: "Ask about job hunting, career paths and interviews, or help a fellow learner with theirs. A great place to network." },
  { id: "random", name: "random", joined: true, body: "Off-topic chat. Share what you're into outside of data and get to know the people learning alongside you." },
  { id: "data-scientist", name: "data-scientist", joined: false, body: "Discuss the Data Scientist career track—courses, lessons and progress—with instructors and other enrolled students." },
  { id: "data-analyst", name: "data-analyst", joined: false, body: "Discuss the Data Analyst career track—courses, lessons and progress—with instructors and other enrolled students." },
  { id: "business-analyst", name: "business-analyst", joined: false, body: "Discuss the Business Analyst career track—courses, lessons and progress—with instructors and other enrolled students." },
  { id: "a-b-testing", name: "a-b-testing", joined: false, body: "Share experiments, ask about test design and grow your A/B testing skills." },
  { id: "business-skills-for-data-science", name: "business-skills-for-data-science", joined: false, body: "Strategy, stakeholder management and communication—the business side of working with data." },
];

export const channelMessages = {
  general: [
    { author: "SkillVexa Team", time: "09:12", text: "Welcome to #general! Introduce yourself and tell us what you're learning this week." },
    { author: "Hira N.", time: "10:04", text: "Hi all! Starting the Data Analyst track today 🙌" },
  ],
  platform: [{ author: "SkillVexa Team", time: "Yesterday", text: "New: practice exams now show your best score on the Exams page." }],
  "career-related": [{ author: "Ahmed Z.", time: "Mon", text: "Any tips for a first data analyst interview? Mostly SQL questions, I think." }],
  random: [{ author: "Maryam S.", time: "Sun", text: "Weekend plans: coffee and finishing the pandas course ☕️" }],
};

export const newsfeedPosts = [
  { id: "p1", author: "Faisal D.", time: "1 hour ago", type: "level", title: "Reached a new level!", value: "Level 3", detail: "Explorer" },
  { id: "p2", author: "Anum G.", time: "5 hours ago", type: "card", title: "Acquired a collectible card", value: "Leonhard Euler", detail: "Pioneers of Mathematics" },
  { id: "p3", author: "Junaid G.", time: "5 hours ago", type: "streak", title: "Streak bonus achieved!", value: "6d", detail: "+3 XP/day" },
  { id: "p4", author: "Gul R.", badge: "Super learner", time: "6 hours ago", type: "goal", title: "Weekly learning goal met", value: "7/7", detail: "days" },
  { id: "p5", author: "Sami P.", time: "18 hours ago", type: "level", title: "Reached a new level!", value: "Level 2", detail: "Beginner" },
];

export const topLearners = [
  { name: "Saad M.", xp: 629 },
  { name: "Gul R.", xp: 547 },
  { name: "Ghazanfar B.", xp: 543 },
  { name: "Faisal D.", xp: 451 },
  { name: "Sami P.", xp: 436 },
];

/* ------------------------------ Onboarding ------------------------- */

export const onboardingGoals = ["Career Change", "Starting my career", "Growing in my current role", "Supplementing my studies", "Fun and personal growth"];

export const onboardingExperience = [
  "I’m new or still learning the fundamentals.",
  "I’m comfortable with key concepts and ready to deepen my skills.",
];

/* ------------------------------- Pricing --------------------------- */

export const pricingFeatures = [
  `${dashboardCourses.length} courses`,
  "Practice exams",
  `${dashboardProjects.length} projects`,
  "AI mock interviews",
  `${dashboardTracks.length} career tracks`,
  "Job Insider Newsletter",
  "Accredited certificates",
  "30-day money-back guarantee",
  "Interactive exercises",
  "Price-lock guarantee",
];

// Sample prices shown on /admin/pricing — replace with SkillVexa's real plans.
export const pricingOptions = [
  { id: "monthly", label: "Monthly", regular: 29, price: 29, period: "/month", note: "Billed monthly" },
  { id: "quarterly", label: "Quarterly", regular: 25, price: 19, period: "/month", note: "Billed quarterly", save: "Save 25%" },
  { id: "annual", label: "Annual", regular: 19, price: 7.63, period: "/month", note: "Billed annually", save: "Save 60%" },
  { id: "lifetime", label: "Lifetime", regular: 599, price: 299, period: " one-time", note: "Pay once, learn forever", save: "Save 50%" },
];

/* ---------------------------- Notifications ------------------------ */

export const notificationCategories = ["News", "Learning", "Gamification", "Newsfeed", "Channels", "Billing", "Q&A"];

/* ------------------------------- Settings -------------------------------- */

export const settingsTabs = [
  { id: "general", label: "General", href: "/admin/settings" },
  { id: "billing", label: "Billing", href: "/admin/settings/billing" },
  { id: "notifications", label: "Notifications", href: "/admin/settings/notifications" },
  { id: "sounds", label: "Sounds", href: "/admin/settings/sounds" },
  { id: "security", label: "Security", href: "/admin/settings/security" },
];
