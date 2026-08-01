import Link from "next/link";
import Reveal from "../components/Reveal";
import { site, skillGroups } from "@/data/portfolio";

export default function About() {
  return (
    <main className="page-shell about-page" id="main-content">
      <Reveal className="about-page__intro">
        <p className="eyebrow"><span>About</span> Vivian Zhou</p>
        <h1>{site.role} with a soft spot for ambitious ideas.</h1>
        {site.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <Link className="text-link" href="/#work">
          Browse selected work <span aria-hidden="true">↗</span>
        </Link>
      </Reveal>
      <div className="about-page__skills">
        {skillGroups.map((group) => (
          <Reveal key={group.label} className="skill-group">
            <h2>{group.label}</h2>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
