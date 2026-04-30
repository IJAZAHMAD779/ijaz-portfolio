import React from "react";
import { motion } from "framer-motion";
import { profile, stats, testimonials } from "../data/mock";
import { Quote } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative px-6 md:px-12 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01" label="About" />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-white">
              Engineering with the patience of a craftsman
              <span className="text-white/50"> and the curiosity of a researcher.</span>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed text-base md:text-lg max-w-2xl">
              {profile.bio}
            </p>
            <p className="mt-4 text-white/55 leading-relaxed text-base max-w-2xl">
              I care about the boring, important things - keystroke latency,
              reduced motion preferences, color contrast, and what happens when the
              network drops at exactly the wrong moment. The rest is just sugar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-md transition hover:border-white/20"
                >
                  <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-linear-to-br from-violet-500/20 to-teal-400/10 blur-2xl opacity-60 group-hover:opacity-100 transition" />
                  <div className="relative font-display text-3xl md:text-4xl tracking-tight text-white">
                    {s.value}
                  </div>
                  <div className="relative mt-2 text-[12px] uppercase tracking-wider text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-md">
              <Quote size={18} className="text-violet-300/80" />
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                “{testimonials[0].quote}”
              </p>
              <div className="mt-4 text-xs text-white/55">
                <span className="text-white/85">{testimonials[0].name}</span> · {testimonials[0].role}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const SectionLabel = ({ index, label }) => (
  <div className="flex items-center gap-4">
    <span className="text-[11px] font-mono tracking-widest text-white/40">{index}</span>
    <span className="h-px w-10 bg-white/15" />
    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/70">
      {label}
    </span>
  </div>
);

export default About;
