import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { navItems, profile } from "../data/mock";
import { useTheme } from "../context/ThemeContext";

const Nav = () => {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const offsets = navItems.map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return { id: n.id, top: Number.POSITIVE_INFINITY };
        const rect = el.getBoundingClientRect();
        return { id: n.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top brand bar */}
      <div className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 md:px-12 py-4 md:py-5 overflow-x-hidden">
        <button
          onClick={() => handleClick("home")}
          className="group flex items-center gap-1 md:gap-2 text-white/90 flex-shrink-0"
        >
          <span className="relative inline-flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 backdrop-blur-md">
            <span className="absolute inset-0 rounded-md bg-linear-to-br from-violet-400/40 via-blue-400/30 to-teal-300/30 blur-[6px] opacity-70" />
            <span className="relative font-semibold text-xs md:text-sm tracking-tight">{profile.name.split(" ").map((s) => s[0]).join("")}</span>
          </span>
          <span className="hidden sm:inline text-sm font-medium tracking-tight">{profile.name}</span>
        </button>
        <div className="flex items-center gap-2 md:gap-3">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <a
            href={profile.resumeUrl}
            download="IJAZ-AHMAD-Resume.pdf"
            className="inline-flex items-center gap-1 md:gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 md:px-4 py-1.5 md:py-2 text-xs font-medium text-white/80 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span className="hidden md:inline">Download CV</span>
            <span className="md:hidden">CV</span>
          </a>
        </div>
      </div>

      {/* Floating bottom glass-pill nav */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 md:bottom-5 left-1/2 z-50 -translate-x-1/2 overflow-hidden"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500/30 via-blue-500/20 to-teal-400/30 blur-xl opacity-70" />
          <ul className="relative flex items-center gap-0.5 md:gap-1 rounded-full border border-white/10 bg-white/6 px-1.5 md:px-2 py-1.5 md:py-2 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <motion.button
                    onClick={() => handleClick(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative z-10 px-2.5 md:px-4 py-1 md:py-1.5 text-[11px] md:text-[13px] font-medium tracking-tight transition rounded-full whitespace-nowrap ${
                      isActive ? "text-white" : "text-white/55 hover:text-white/90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Nav;
