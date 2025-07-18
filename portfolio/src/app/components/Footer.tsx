import { mySocials } from "../constants";
import Image from "next/image";
const Footer = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Vivian Zhou</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index}>
            <Image src={social.icon} className="w-5 h-5" alt={social.name} width={10} height={10}/>
          </a>
        ))}
      </div>
      <p>© 2025. All rights reserved.</p>
    </section>
  );
};

export default Footer;