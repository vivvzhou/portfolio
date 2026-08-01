import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import SceneLoader from "./components/SceneLoader";
import ProjectCard from "./components/ProjectCard";
import Reveal from "./components/Reveal";
import { experiences, projects, site, skillGroups } from "@/data/portfolio";

const featuredProjects = projects.filter((project) => project.featured);

export default function Home() {
  return (
    <main className="portfolio-main" id="main-content">
      <SceneLoader />
      <Hero />

      <section className="section section--work section--work--orbit" id="work" aria-labelledby="work-title">
        <div className="work-orbit__stage" data-work-orbit>
        <Reveal className="work-orbit__intro page-shell">
          <p className="eyebrow"><span>01</span> Selected work</p>
          <h2 id="work-title">Ideas made tangible.</h2>
          <p>
            Scroll through the work orbit, then choose a project to explore.
          </p>
        </Reveal>
        <div className="project-grid project-grid--orbit" aria-label="Selected projects">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <Reveal className="work-orbit__archive">
          <Link className="text-link" href="/projects">
            See the full archive <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>
        </div>
      </section>

      <section className="section section--experience" id="experience" aria-labelledby="experience-title">
        <div className="page-shell split-section">
          <Reveal className="section-intro" direction="left" distance={52}>
            <p className="eyebrow"><span>02</span> Experience & tools</p>
            <h2 id="experience-title">Curious by default.<br />Reliable by practice.</h2>
          </Reveal>
          <div>
            <div className="timeline">
              {experiences.map((experience, index) => (
                <Reveal key={experience.organization} direction="right" distance={46} delay={index * 0.1}>
                  <article className="timeline__item">
                    <p>{experience.date}</p>
                    <div>
                      <h3>{experience.title}</h3>
                      <h4>{experience.organization}</h4>
                      <p>{experience.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <Reveal key={group.label} direction="scale" distance={34} delay={0.2 + index * 0.09}>
                  <section className="skill-group" aria-labelledby={"skills-" + group.label.toLowerCase()}>
                    <h3 id={"skills-" + group.label.toLowerCase()}>{group.label}</h3>
                    <ul>
                      {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--about page-shell" id="about" aria-labelledby="about-title">
        <div className="about-card">
          <Reveal className="about-card__copy" direction="left" distance={58}>
            <p className="eyebrow"><span>03</span> About me</p>
            <h2 id="about-title">Making the technical feel a little more alive.</h2>
            {site.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="about-card__location">{site.location}</p>
          </Reveal>
          <Reveal className="about-card__image" direction="right" distance={58} delay={0.14}>
            <Image
              src="/flower.png"
              alt="A sculptural flower with reflective petals"
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <Reveal className="page-shell contact-section__inner">
          <p className="eyebrow"><span>04</span> Contact</p>
          <h2 id="contact-title">Have an interesting problem?</h2>
          <a className="contact-email" href={"mailto:" + site.email}>{site.email}</a>
          <p>Open to internships, research, and creative collaborations.</p>
        </Reveal>
      </section>
    </main>
  );
}
