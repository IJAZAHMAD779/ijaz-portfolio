import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Code, Briefcase, MessageCircle, Globe, Send, MapPin, Check } from "lucide-react";
import { profile } from "../data/mock";
import { SectionLabel } from "./About";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing fields", description: "Fill in name, email and message." });
      return;
    }
    // Frontend-only: persist locally
    const list = JSON.parse(localStorage.getItem("contact_msgs") || "[]");
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem("contact_msgs", JSON.stringify(list));
    setSent(true);
    toast({ title: "Message captured ✨", description: "I'll be in touch within 48h." });
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  const socials = [
    { Icon: Code, href: profile.socials.github, label: "GitHub" },
    { Icon: Briefcase, href: profile.socials.linkedin, label: "LinkedIn" },
    { Icon: MessageCircle, href: profile.socials.twitter, label: "Twitter" },
    { Icon: Globe, href: profile.socials.dribbble, label: "Portfolio" }
  ];

  return (
    <section id="contact" className="relative px-6 md:px-12 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" label="Contact" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-white">
              Let's build something
              <span className="bg-linear-to-r from-violet-300 via-blue-300 to-teal-200 bg-clip-text text-transparent"> worth using.</span>
            </h2>
            <p className="mt-5 text-white/60 leading-relaxed max-w-md">
              I take on a small number of projects each quarter - product
              engineering, design systems, or hands-on R&D. Drop a note and tell
              me what you're working on.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 backdrop-blur-md transition hover:border-white/25 hover:bg-white/7"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-200">
                  <Mail size={14} />
                </span>
                <span className="text-white/85">{profile.email}</span>
              </a>
              <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 backdrop-blur-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-teal-200">
                  <MapPin size={14} />
                </span>
                <span className="text-white/85">{profile.location}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socials.map(({ Icon, href, label }, idx) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 backdrop-blur-md transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-violet-500/10 via-blue-500/5 to-teal-400/10 blur-2xl" />
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 md:p-8 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Ada Lovelace"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="ada@analytical.engine"
                />
              </div>
              <div className="mt-4">
                <label className="text-[11px] uppercase tracking-widest text-white/45">
                  Project / message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Tell me about scope, timeline, and what success looks like…"
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-300/50 focus:bg-black/40"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] text-white/40">
                  Replies usually within 48 hours. No newsletters, ever.
                </p>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/15"
                >
                  <span className="absolute inset-0 -z-10 bg-linear-to-r from-violet-500/30 via-blue-500/20 to-teal-400/30 opacity-0 transition group-hover:opacity-100" />
                  {sent ? (
                    <>
                      <Check size={15} /> Sent
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send message
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <label className="text-[11px] uppercase tracking-widest text-white/45">{label}</label>
    <motion.input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      whileFocus={{ scale: 1.01, y: -2 }}
      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-300/50 focus:bg-black/40"
    />
  </motion.div>
);

export default Contact;
