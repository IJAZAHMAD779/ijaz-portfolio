import React, { Suspense, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { profile } from "../data/mock";
import * as THREE from "three";

const MorphingBlob = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Rotate the blob
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.cos(t * 0.4) * 0.2;

    // Morph the scale
    const scale = 1 + Math.sin(t * 0.5) * 0.2;
    meshRef.current.scale.set(scale, scale, scale);

    // Update the distortion material
    if (meshRef.current.material.uniforms) {
      meshRef.current.material.uniforms.uTime.value = t;
    }
  });

  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal;

    void main() {
      vec3 pos = position;
      
      // Create wave distortion
      float wave = sin(pos.x * 3.0 + uTime) * 0.1;
      wave += sin(pos.y * 3.0 + uTime * 0.7) * 0.1;
      wave += sin(pos.z * 3.0 + uTime * 0.5) * 0.1;
      
      pos += normalize(position) * wave;
      
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;

    void main() {
      // Create gradient based on normal
      vec3 color1 = vec3(0.7, 0.5, 1.0); // Violet
      vec3 color2 = vec3(0.35, 1.0, 0.8); // Teal
      
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      vec3 finalColor = mix(color1, color2, fresnel);
      
      gl_FragColor = vec4(finalColor, 0.95);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        wireframe={false}
        transparent
      />
    </mesh>
  );
};

const WireSphere = () => {
  return <MorphingBlob />;
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#a78bfa" />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#5eead4" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
          <WireSphere />
        </Float>
      </Suspense>
    </Canvas>
  );
};

const TypingRole = () => {
  const roles = [
    "Full Stack Developer",
    "Web Designer",
    "React Specialist",
    "Creative Coder",
    "Tech Enthusiast",
  ];

  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          setSpeed(100);
        } else {
          // Pause before deleting
          setSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          setSpeed(50);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, speed]);

  return (
    <span className="text-white/80">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-svh w-full pt-28 md:pt-24 px-6 md:px-12 flex items-center"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-white/70">
              Let's Build Together
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.02] tracking-tight text-white"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="bg-linear-to-r from-violet-300 via-blue-300 to-teal-200 bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
            <br />
            <span className="text-xl md:text-3xl font-display text-white/70">
              <TypingRole />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/60"
          >
            {profile.tagline} I design and build systems that feel inevitable -
            fast, accessible, and quietly opinionated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/25 hover:bg-white/15"
            >
              <span className="absolute inset-0 -z-10 bg-linear-to-r from-violet-500/20 via-blue-500/10 to-teal-400/20 opacity-0 transition group-hover:opacity-100" />
              View selected work
              <ArrowDownRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/70 transition hover:text-white"
            >
              <Sparkles size={15} /> Let's talk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
          >
            {[
              { k: "Based in", v: profile.location.split(",")[0] },
              { k: "Focus", v: "Web · Systems" },
              { k: "Stack", v: "TS · Rust · Go" },
              { k: "Status", v: "Open to consult" }
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/4 p-3 backdrop-blur-md"
              >
                <div className="text-[10px] uppercase tracking-wider text-white/40">{s.k}</div>
                <div className="mt-1 text-sm text-white/85">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <div className="lg:col-span-5 relative h-80 md:h-95 overflow-hidden">
          <div className="absolute inset-0 rounded-4xl border border-white/10 bg-white/3 backdrop-blur-md overflow-hidden flex items-center justify-center py-12 px-4">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-400/20 blur-3xl" />
            <div className="w-full h-full flex items-center justify-center">
              <Scene />
            </div>
            {/* Floating tags */}
            <div className="pointer-events-none absolute bottom-6 right-6 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] tracking-widest text-white/70 backdrop-blur-md">
              v 7.24.1
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
        <div className="h-10 w-px bg-linear-to-b from-white/40 to-transparent" />
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
