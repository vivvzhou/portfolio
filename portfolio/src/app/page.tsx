"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {

  useGSAP(() => {
    const introTL = gsap.timeline();
    introTL
    .set(".header", { opacity: 1 })
    .from(".title", {
      y: 50,
      opacity: 0,
      ease: "slow"
    })
    .from(".description", {
      delay: .2,
      opacity: 0,
      y: 30,
      ease: "slow"
    });

    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: true,
      }
    });

    scrollTL
    .from(".side", {
      x: 100,
      opacity: 0,
      ease: "power4.out"
    })
  });

  return (
    <div className="hero">
      <div className="header opacity-0 text-center">
        <h1 className="title text-7xl text-center mt-20">Hi! I'm Vivian.</h1>
        <p className="description text-xl p-4 pb-200">Second year at Georgia Tech interested in AI, computer graphics, design, and building cool things.</p>
      </div>
      <div className="side">
        <h2 className="side-heading text-5xl pl-10">Side heading</h2>
        <p className="side-text text-xl p-10 pb-200">Side text sjkfj skjf lksj lsk ls jlsk ls </p>
      </div>
      
    </div>
  );
}
