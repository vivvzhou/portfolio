export const myProjects = [
  {
    id: 1,
    title: "GT Movies Store",
    description:
      "Full-stack movie store web application built with Django for Georgia Tech students (50+ users) to browse, purchase, and review films.",
    subDescription: [
      "Built and deployed with a team using Django and MongoDB.",
      "Integrated MongoDB for scalable user data storage.",
      "Implemented RESTful CRUD operations via the Open Movie Database API.",
      "Deployed on the web for campus access.",
    ],
    href: "https://github.com/TumeloN1/GT-Movies",
    logo: "",
    image: "/projects/gtmovies.png", // Add your image asset here if available
    tags: [
      { id: 1, name: "Django", path: "/logos/django.png" },
      { id: 2, name: "MongoDB", path: "/logos/mongodb.png" },
    ],
  },

    {
    id: 2,
    title: "Current Research Intern — Human-AI Teaming in Minecraft",
    description:
        "Exploring human-AI coordination and RL in procedurally generated Minecraft emergency scenarios.",
    subDescription: [
        "Building a Deep Q-Network agent by connecting Minecraft (Node.js) to a custom Python Gym via WebSockets.",
        "Studying team strategies and coordination under risk.",
        "Provisioned hybrid compute clusters with AWS EC2, KVM, Vagrant, and automated VM management using Ansible.",
    ],
    href: "", // Add link if available
    logo: "",
    image: "",
    tags: [
        { id: 1, name: "Reinforcement Learning", path: "" },
        { id: 2, name: "Python", path: "" },
        { id: 3, name: "Minecraft", path: "" },
        { id: 4, name: "AWS", path: "" },
        { id: 5, name: "KVM", path: "" },
        { id: 6, name: "Ansible", path: "" },
    ],
    },
{
    id: 3,
    title: "MIT Beaverworks Summer Institute — Serious Games with AI",
    description:
      "Built a multiplayer serious game and a reinforcement learning agent for ethical risk management and planning.",
    subDescription: [
      "Developed a Python RL agent with Q-Learning for complex response planning in a custom simulation.",
      "Trained a PyTorch CNN to 97% accuracy for in-game ethical decision prediction.",
      "Hosted a live tournament with 90+ players.",
    ],
    href: "https://github.com/vivvzhou/BWSI-SGAI", // Add link if available
    logo: "",
    image: "/projects/bwsi.png",
    tags: [
      { id: 1, name: "Python", path: "" },
      { id: 2, name: "PyTorch", path: "" },
      { id: 3, name: "Reinforcement Learning", path: "" },
      { id: 4, name: "Serious Games", path: "" },
    ],
  },
  {
    id: 4,
    title: "Full-Stack Developer — Bits of Good",
    description:
      "Developed a full-stack animal training app for a nonprofit using NextJS, MongoDB, and AWS. Led engineering efforts and improved platform security.",
    subDescription: [
      "Built and maintained a NextJS + MongoDB animal training web app for Healing4Heroes.",
      "Implemented secure authentication, RESTful API endpoints, and custom admin dashboards.",
      "Containerized and deployed app to AWS EKS via Docker and Kubernetes, achieving high uptime.",
    ],
    href: "", // Example, update as needed
    logo: "",
    image: "/projects/bog.png",
    tags: [
      { id: 1, name: "Next.js", path: "" },
      { id: 2, name: "MongoDB", path: "" },
      { id: 3, name: "AWS", path: "" },
      { id: 4, name: "Docker", path: "" },
      { id: 5, name: "Kubernetes", path: "" },
    ],
  },
{
    id: 5,
    title: "BlackMarket",
    description:
        "Nextjs e-commerce platform",
    subDescription: [
        "Built and maintained a NextJS + MongoDB animal training web app for Healing4Heroes.",
        "Implemented secure authentication, RESTful API endpoints, and custom admin dashboards.",
    ],
    href: "https://github.com/BlackMarketGT/BlackMarket",
    logo: "",
    image: "/projects/chartrag.png", // Add your image asset here if available
    tags: [
        { id: 1, name: "Flask", path: "/logos/flask.svg" },
        { id: 2, name: "React", path: "/logos/react.svg" },
    ],
},
{
    id: 6,
    title: "ChartRAG",
    description:
        "Flask-based RESTful API application that integrates OpenAI API for CSV ingestion, validation, and statistical data visualization.",
    subDescription: [
        "Built for Hackylitics 2025.",
        "Handles CSV ingestion, validation, and data processing.",
        "Generates statistical summaries and visualizations via OpenAI API.",
    ],
    href: "https://github.com/vivvzhou/chartRAG",
    logo: "",
    image: "/projects/chartrag.png", // Add your image asset here if available
    tags: [
        { id: 1, name: "Flask", path: "/logos/flask.svg" },
        { id: 2, name: "React", path: "/logos/react.svg" },
    ],
    },


];

export const mySocials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/vivian-zhou06",
    icon: "/socials/linkedIn.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/vivvzhou",
    icon: "/socials/github.png",
  },
  {
    name: "Email",
    href: "mailto:vivywzhou@gmail.com",
    icon: "/socials/gmail.png", // Add or create this SVG asset if you don't have it
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vivvzhou/",
    icon: "/socials/instagram.svg", // Add or create this SVG asset if you don't have it
  },
];

export const experiences = [
  {
    title: "Research Intern",
    job: "Human-AI Teaming Concepts in Minecraft",
    date: "May 2025 – Present",
    contents: [
      "Building a Deep Q-Network (DQN) RL agent by streaming Minecraft game states/actions between Node.js and a custom Gym environment in Python via WebSockets.",
      "Studying human-AI coordination in emergency risk scenarios within a procedurally generated Minecraft environment.",
      "Provisioning hybrid compute clusters using AWS EC2, KVM, and Vagrant; automating configuration and management of VMs using Ansible.",
    ],
  },
  {
    title: "Full-Stack Developer",
    job: "Bits of Good @ Georgia Tech",
    date: "Jan 2024 – Present",
    contents: [
      "Built full-stack NextJS + MongoDB animal training web app for nonprofit Healing4Heroes with team.",
      "Implemented secure authentication, RESTful API endpoints for CRUD operations, and role-based admin dashboards with JWT, bcrypt, and custom middleware.",
      "Containerized the application with Docker and deployed to AWS EKS via Kubernetes, achieving 99.9% uptime.",
    ],
  },
  {
    title: "MIT Beaverworks Summer Institute",
    job: "Serious Games with AI Program",
    date: "Jun 2023 – Aug 2023",
    contents: [
      "Developed a serious game (90+ players) and a reinforcement learning agent with Q-Learning from scratch in Python for response planning and risk management.",
      "Trained a PyTorch-based CNN with 97% in-game prediction accuracy to assist ethical decision-making in an RL simulation.",
    ],
  },
];

export const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "Bachelor of Science in Computer Science",
    date: "Expected May 2027",
    GPA: "3.9/4.0",
    relevantCourses: [
      "Algorithm Design and Analysis",
      "Machine Learning",
      "Probability and Statistics",
      "Object-oriented Programming",
      "Linear Algebra",
      "Discrete Math",
      "Data Structures and Algorithms",
      "Computer Organization and Programming",
      "Multivariable Calculus",
    ],
  },
];

export const technicalSkills = {
  languages: [
    "Java",
    "Python",
    "C",
    "JavaScript/TypeScript",
    "HTML/CSS",
    "SQL",
  ],
  software: [
    "Figma",
    "React",
    "Django",
    "Flask",
    "Next.js",
    "Node.js",
    "Express.js",
    "AWS",
    "KVM",
    "Vagrant",
    "Ansible",
    "Docker",
    "Kubernetes",
    "Unity",
    "PyTorch",
    "TensorFlow",
    "MongoDB",
    "MySQL",
    "RESTful API",
    "Git",
    "OpenAI API",
    "Gym",
    "WebSockets",
  ],
  concepts: [
    "Machine Learning",
    "DQN",
    "Reinforcement Learning",
    "CNN",
    "Object Oriented Programming",
  ],
};
