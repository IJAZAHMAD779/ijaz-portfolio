import React from "react";
import { profile } from "../data/mock";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-12 px-6 md:px-12 pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-display text-xl tracking-tight text-white">
                {profile.name}
              </div>
              <div className="mt-1 text-sm text-white/55">
                {profile.role} · {profile.location}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
              <span>© {new Date().getFullYear()} - Crafted in the dark mode.</span>
              <span className="hidden md:inline">·</span>
              <span>Built with React, Three.js & Framer Motion</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md transition hover:border-white/25 hover:text-white"
            >
              Back to top
              <ArrowUp size={13} className="transition group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
