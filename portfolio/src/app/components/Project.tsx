import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

type Tag = {
  id: number;
  name: string;
  path?: string;
};

type ProjectProps = {
    title: string;
  description: string;
  subDescription: string[];
  href: string;
  image?: string;
  tags: Tag[]
  setPreview: (img: string | null) => void;
};

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview
  // ...
}: ProjectProps) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image ?? null)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-fuchsia">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation text-sand"
        >
          Read More
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image ?? ""}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;