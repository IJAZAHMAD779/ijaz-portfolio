import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/mock";
import { SectionLabel } from "./About";

const Projects = () => {
  return (
    <section id="projects" className="relative px-6 md:px-12 py-28 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" label="Selected Work" />
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-white max-w-3xl">
            Six projects, each a study in
            <span className="text-white/50"> performance, polish and intent.</span>
          </h2>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 backdrop-blur-md transition hover:border-white/20 hover:text-white"
          >
            View archive <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    setTilt({
      rx: (py - 0.5) * -8,
      ry: (px - 0.5) * 10,
      mx: px * 100,
      my: py * 100
    });
  };

  const handleLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d"
        }}
        className="relative h-95 overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-md transition-[transform,border-color] duration-300 hover:border-white/25"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className={`absolute inset-0 bg-linear-to-br ${project.accent} mix-blend-soft-light`} />
          <div className="absolute inset-0 bg-linear-to-t from-[#07070b] via-[#07070b]/60 to-transparent" />
        </div>

        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.12), transparent 60%)`
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur-md">
              {project.category}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-md transition group-hover:bg-white/15 group-hover:text-white">
              <ArrowUpRight size={15} />
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl tracking-tight text-white">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2 max-w-md">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/75 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Glass overlay reveal */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[12px] text-white/85 opacity-0 backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-mono tracking-wider text-white/55">CASE STUDY →</span>{" "}
          Read how we built {project.title}.
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
