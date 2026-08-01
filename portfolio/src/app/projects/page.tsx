import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <main className="page-shell archive-page" id="main-content">
      <Reveal className="archive-page__intro">
        <p className="eyebrow"><span>Archive</span> All projects</p>
        <h1>The full trail of experiments, systems, and shipped work.</h1>
        <Link className="text-link" href="/">
          Back home <span aria-hidden="true">↖</span>
        </Link>
      </Reveal>
      <div className="project-grid project-grid--archive">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 3) * 0.05}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
