import { site, socialLinks } from "@/data/portfolio";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Reveal className="page-shell site-footer__inner">
        <p>© {new Date().getFullYear()} Vivian Zhou</p>
        <p>{site.location}</p>
        <div className="footer-links">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
