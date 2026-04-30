import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "../data/mock";
import { SectionLabel } from "./About";
import { Briefcase } from "lucide-react";

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 md:px-12 py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" label="Experience" />
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-white max-w-2xl">
            A timeline of teams, problems and<span className="text-white/50"> things shipped.</span>
          </h2>
          <p className="text-sm text-white/55 max-w-sm">
            Career Milestones - Hover for the full story
          </p>
        </div>

        <div ref={containerRef} className="relative mt-16 pl-10 md:pl-16">
          {/* Static line */}
          <div className="absolute left-3 md:left-7 top-0 bottom-0 w-0.5 bg-white/10" />
          {/* Animated glowing line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 md:left-7 top-0 w-0.5 bg-linear-to-b from-violet-400 via-blue-400 to-teal-300 shadow-[0_0_18px_rgba(139,124,255,0.6)]"
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {timeline.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="relative"
    >
      {/* Node */}
      <div className="absolute -left-8.5 md:-left-13 top-3 flex h-5 w-5 items-center justify-center">
        <span className="absolute h-5 w-5 rounded-full bg-violet-500/30 blur-md" />
        <span className="relative h-3 w-3 rounded-full border border-white/30 bg-white/80 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
      </div>

      <div className="group relative">
        <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-violet-500/0 via-blue-500/0 to-teal-400/0 opacity-0 blur-xl transition group-hover:from-violet-500/30 group-hover:via-blue-500/20 group-hover:to-teal-400/20 group-hover:opacity-100" />
        <div className="relative rounded-2xl border border-white/10 bg-white/4 p-6 md:p-7 backdrop-blur-md transition group-hover:border-white/20 group-hover:bg-white/6 group-hover:scale-[1.01]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white/55">
              <Briefcase size={13} />
              {item.year}
            </div>
            <span className="text-[11px] tracking-widest uppercase text-white/40">
              {item.company}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl md:text-2xl tracking-tight text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-white/65 max-w-2xl">
            {item.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
