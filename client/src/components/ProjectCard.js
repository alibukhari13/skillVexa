import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, float = false }) {
  return (
    <article
      className={`group h-full flex flex-col bg-white rounded-[20px] shadow-[0_0_16px_rgba(0,0,0,0.12)] overflow-hidden p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)] ${
        float ? "animate-float-y" : ""
      }`}
    >
      <div className="relative h-[220px] sm:h-[247px] overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 409px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 pt-5 gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl leading-[30px] font-bold text-[#0F172A]">
            {project.title}
          </h3>
          <p className="text-base leading-6 text-[#636363]">
            {project.description}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <p className="text-xl leading-[30px] font-medium">
            <span className="text-[#0F172A]">Type: </span>
            <Link href={project.href} className="text-[#2563EB] hover:underline">
              {project.type}
            </Link>
          </p>
          <p className="text-xl leading-[30px] font-medium">
            <span className="text-[#0F172A]">Duration: </span>
            <span className="text-[#2563EB]">{project.duration}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
