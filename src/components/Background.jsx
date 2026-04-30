import React from "react";

/**
 * Animated mesh gradient background with deep charcoal base
 * and slow-moving purple / blue / teal blobs.
 */
const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#07070b]">
      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }}
      />

      {/* Mesh blobs */}
      <div className="absolute -top-40 -left-40 h-130 w-130 rounded-full bg-violet-600/30 blur-[120px] animate-mesh-1" />
      <div className="absolute top-1/3 -right-40 h-150 w-150 rounded-full bg-blue-500/25 blur-[140px] animate-mesh-2" />
      <div className="absolute bottom-0 left-1/4 h-120 w-120 rounded-full bg-teal-400/20 blur-[130px] animate-mesh-3" />
      <div className="absolute top-1/2 left-1/2 h-90 w-90 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px] animate-mesh-4" />

      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")"
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#07070b]/80" />
    </div>
  );
};

export default Background;
