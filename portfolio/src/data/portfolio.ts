export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  impact: string;
  stack: string[];
  image?: string;
  imageAlt?: string;
  video?: string;
  href?: string;
  featured: boolean;
};

export type Experience = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

export const site = {
  name: "Vivian Zhou",
  role: "Computer science student & creative technologist",
  location: "Atlanta, GA · open to remote collaboration",
  email: "vivywzhou@gmail.com",
  intro:
    "I build thoughtful, technically ambitious digital experiences at the intersection of AI, graphics, and human-centered design.",
  about: [
    "I’m a Georgia Tech computer science student who likes making complex systems feel playful, legible, and human.",
    "From reinforcement-learning research to production web applications, I care about the craft behind an experience as much as the technology that powers it.",
  ],
} as const;

export const navigation = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "about", label: "About", href: "/#about" },
] as const;

export const projects: Project[] = [
  {
    id: "walmart-sales-forecasting",
    title: "Walmart Sales Forecasting",
    eyebrow: "Machine learning · Fall 2025",
    description:
      "An end-to-end retail forecasting pipeline trained on 400K+ weekly sales records from 45 Walmart stores.",
    impact:
      "Benchmarked Random Forest, Linear Regression, KNN, ARIMA, and Seasonal Naive models; Random Forest reached 0.478 RMSE, 0.164 MAE, and explained 85.9% of sales variance.",
    stack: ["Python", "scikit-learn", "statsmodels", "Pandas"],
    image: "/projects/walmart-forecasting.png",
    imageAlt: "Random Forest and KNN forecasts plotted against actual Walmart department sales",
    href: "https://github.gatech.edu/pages/vzhou32/MLProject-25-site/midterm/",
    featured: true,
  },
  {
    id: "art-works",
    title: "Art Works",
    eyebrow: "Pixel art & illustration",
    description:
      "Pixel art for an atmospheric game environment, including the background, crystal tileset, and plant asset.",
    impact:
      "Building detailed digital scenes through environmental storytelling, texture, color, and light.",
    stack: ["Pixel Art", "Environment Design", "Tilesets", "Game Art"],
    image: "/projects/art-works.png",
    imageAlt: "A pixel-art cave game environment with crystal formations, foliage, and dark blue stone walls",
    href: "https://www.instagram.com/soooshieee",
    featured: true,
  },
  {
    id: "real-time-vulkan-renderer",
    title: "Real-Time Vulkan Renderer",
    eyebrow: "Graphics systems · C++20 / Vulkan",
    description:
      "A from-scratch real-time C++20/Vulkan renderer with deferred PBR, glTF loading, image-based lighting, and shadow mapping.",
    impact:
      "Profiled a four-pass GPU pipeline to about 1.5 ms per frame; added multithreaded command recording, custom GPU memory allocation, and neural ambient occlusion in a compute shader.",
    stack: ["C++20", "Vulkan", "GLSL / SPIR-V", "Compute Shaders"],
    image: "/projects/vulkan-car.png",
    imageAlt: "A glossy black sports car rendered by the Real-Time Vulkan Renderer",
    href: "https://github.com/vivvzhou/vulkan-renderer",
    featured: true,
  },
  {
    id: "blender-works",
    title: "Blender Works",
    eyebrow: "3D art & motion",
    description:
      "A selection of 3D scenes, studies, and motion experiments created in Blender.",
    impact:
      "Exploring composition, lighting, materials, and animation through short-form 3D work.",
    stack: ["Blender", "3D Modeling", "Lighting", "Animation"],
    video: "/projects/blender-works.mp4",
    featured: true,
  },
  {
    id: "bwsi",
    title: "MIT Beaverworks Summer Institute",
    eyebrow: "Serious Games with AI",
    description:
      "A multiplayer serious game and reinforcement-learning agent for ethical risk planning.",
    impact:
      "Trained a PyTorch CNN to 97% accuracy and hosted a live tournament with more than 90 players.",
    stack: ["Python", "PyTorch", "Reinforcement Learning"],
    image: "/projects/bwsi.png",
    imageAlt: "MIT Beaverworks Serious Games with AI project preview",
    href: "https://github.com/vivvzhou/BWSI-SGAI",
    featured: false,
  },
  {
    id: "blackmarket",
    title: "BlackMarket",
    eyebrow: "Next.js e-commerce platform",
    description:
      "A student-built e-commerce platform developed with the BlackMarketGT team.",
    impact:
      "Contributed to a modern commerce interface and the project’s web application foundation.",
    stack: ["Next.js", "Flask", "React"],
    image: "/projects/chartrag.png",
    imageAlt: "BlackMarket project interface preview",
    href: "https://github.com/BlackMarketGT/BlackMarket",
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    title: "Machine Learning Engineer Intern",
    organization: "Expedia Group - ML Platform Inference Team",
    date: "May 2026 - Aug 2026",
    description:
      "Built data-composition stages for Expedia's ML Orchestrator, processing about 128M inference requests daily; developed sub-5 ms syntax and sub-45 ms full payload validation with more than 96% test coverage.",
  },
  {
    title: "Human-AI Teaming Research Assistant",
    organization: "Georgia Institute of Technology",
    date: "May 2025 - Present",
    description:
      "Built a Python evaluation pipeline for 13K+ logs across four models, reducing failure-analysis time by 11%; developed a DQN agent and Node.js-to-Python Gym bridge that increased training throughput by 27%.",
  },
  {
    title: "Software Engineer Intern",
    organization: "narb",
    date: "Aug 2025 - Nov 2025",
    description:
      "Built a multi-LLM inference pipeline with Next.js, Redis, and PostgreSQL for 6+ models and 60K+ token requests, raising cross-model consistency F1 from 0.65 to 0.86 while reducing timeouts by about 40%.",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Java", "Python", "C++", "C", "TypeScript", "SQL", "SpEL", "GLSL"],
  },
  {
    label: "ML + Data",
    skills: ["PyTorch", "scikit-learn", "TensorFlow", "XGBoost", "SHAP", "NumPy", "pandas"],
  },
  {
    label: "Web + Platform",
    skills: ["React", "Next.js", "Node.js", "Spring Boot", "Redis", "PostgreSQL", "KServe", "AWS", "Docker", "Kubernetes", "WebSocket", "Git"],
  },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/vivian-zhou06" },
  { label: "GitHub", href: "https://github.com/vivvzhou" },
  { label: "Instagram", href: "https://www.instagram.com/vivvdraws" },
] as const;
