import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/mock";
import { SectionLabel } from "./About";
import { Code2, Server, Cpu, Sparkles } from "lucide-react";

const icons = {
  Frontend: Code2,
  Backend: Server,
  "Infra & Tools": Cpu,
  Craft: Sparkles
};

const Skills = () => {
  return (
    <section id="skills" className="relative px-6 md:px-12 py-28 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" label="Toolkit" />
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-white max-w-3xl">
            A pragmatic stack,
            <span className="text-white/50"> sharpened over years.</span>
          </h2>
          <p className="text-sm text-white/55 max-w-sm">
            Tools change - fundamentals don't. I pick boring, sturdy tech first,
            and add novelty where it earns its place.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((group, i) => {
            const Icon = icons[group.category] || Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-md transition hover:border-white/20"
              >
                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-linear-to-br from-violet-500/20 via-blue-500/10 to-teal-400/10 blur-2xl opacity-60 transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-200">
                      <Icon size={16} />
                    </span>
                    <div className="text-[11px] uppercase tracking-widest text-white/55">
                      {group.category}
                    </div>
                  </div>
                  <ul className="mt-5 space-y-1.5">
                    {group.items.map((it, idx) => (
                      <motion.li
                        key={it}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + i * 0.06 }}
                        className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition group/item"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40 group-hover/item:bg-violet-300 transition" />
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
