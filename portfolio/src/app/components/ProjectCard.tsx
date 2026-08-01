import Image from "next/image";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="project-card__visual" aria-hidden="true">
        {project.video ? (
          <video
            className="project-card__image project-card__video"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 36vw"
            className="project-card__image"
          />
        ) : (
          <div className="project-card__research-mark">
            <span>01</span>
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="project-card__content">
        <p className="eyebrow">
          <span>0{index + 1}</span> {project.eyebrow}
        </p>
        <h3>{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <p className="project-card__impact">{project.impact}</p>
        <ul className="tag-list" aria-label={project.title + " technologies"}>
          {project.stack.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <span className="project-card__arrow" aria-hidden="true">↗</span>
    </>
  );

  if (!project.href) {
    return <article className="project-card project-card--static" data-project-card>{cardContent}</article>;
  }

  return (
    <a
      className="project-card"
      data-project-card
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={"Open " + project.title + " project"}
    >
      {cardContent}
    </a>
  );
}
