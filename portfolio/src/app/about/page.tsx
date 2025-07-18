"use client";
import Image from "next/image";
import { Globe } from "../components/Globe";
import Link from "next/link";
import FadeInComponent from "../components/FadeIn";

export default function Home() {
    return (
        <FadeInComponent>
        <section className="c-space section-spacing mt-20">
            <h2 className="text-heading">about me</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
                <div className="flex items-end grid-default-color grid-1 ">
                    <Image 
                        src="/coding-pov.png" 
                        className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]" 
                        width={500} 
                        height={500}
                        quality={100}
                        alt="coding pov"
                    />
                    <div className="z-10">
                        <p className="headtext">hi, i&apos;m vivian zhou</p>
                        <p className="subtext">
                            i&apos;m a rising second year computer science student at georgia tech. this past year, i&apos;ve not only developed my 
                            frontend and backend dev skills, but i&apos;ve also practiced being creative in a world where technology drives innovation.
                        </p>
                    </div>
                    <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-pink" />
                </div>
                <div className="grid-default-color grid-2 flex items-end">
                    <Link href="/projects">
                        <div className="z-10 w-[50%]">
                            <p className="headtext">my projects</p>
                            <p className="subtext">
                                check out my projects and art!
                            </p>
                            <Image 
                                src="/flower.png" 
                                className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-70 md:inset-y-10 lg:scale-[2.5]" 
                                width={300} 
                                height={300}
                                quality={100}
                                alt="coding pov"
                            />
                        </div>
                    </Link>
                    
                </div>
                <div className="grid-black-color grid-3">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">time zone</p>
                        <p className="subtext">
                        i&apos;m based in Atlanta, GA, and open to remote work worldwide
                        </p>
                    </div>
                    <figure className="absolute left-[30%] top-[10%]">
                        <Globe className=""/>
                    </figure>
                </div>
            </div>
        </section>
        </FadeInComponent>
    )
}
