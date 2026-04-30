import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { faqData } from "../data/mock";

const Chatbot = () => {
  const [selectedQId, setSelectedQId] = useState(null);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const selectedQ = faqData.find((item) => item.id === selectedQId);

  useEffect(() => {
    if (!selectedQ) return;

    setDisplayedAnswer("");
    setIsTyping(true);

    let index = 0;
    const fullText = selectedQ.answer;
    const typingSpeed = 20; // ms per character

    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedAnswer(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [selectedQ]);

  return (
    <section className="relative py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-white mb-4">
            Quick Q&A
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Have questions about me? Select from these common questions and get
            instant answers.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-violet-500/10 via-blue-500/5 to-teal-400/10 blur-2xl" />

          <div className="rounded-2xl border border-white/10 bg-white/4 p-6 md:p-8 backdrop-blur-md">
            {selectedQId === null ? (
              // Questions List
              <div className="space-y-3">
                {faqData.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedQId(item.id)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition group"
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle
                        size={18}
                        className="text-violet-300 mt-1 flex-shrink-0 group-hover:scale-110 transition"
                      />
                      <p className="text-white/85 font-medium text-sm md:text-base leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              // Answer Display
              <motion.div
                key={selectedQId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedQId(null);
                    setDisplayedAnswer("");
                  }}
                  className="mb-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to questions
                </motion.button>

                {/* Question Display */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 p-4 rounded-xl border border-violet-300/20 bg-violet-500/5"
                >
                  <p className="text-violet-300 font-medium text-sm md:text-base">
                    {selectedQ?.question}
                  </p>
                </motion.div>

                {/* Answer with Typing Animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {displayedAnswer}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-2 h-5 ml-1 bg-violet-300 rounded-sm"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Divider for spacing */}
                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 pt-6 border-t border-white/10"
                  >
                    <p className="text-white/50 text-sm">
                      Still have questions?{" "}
                      <motion.button
                        whileHover={{ textDecoration: "underline" }}
                        onClick={() => {
                          setSelectedQId(null);
                          setDisplayedAnswer("");
                        }}
                        className="text-violet-300 hover:text-violet-200 transition"
                      >
                        Browse more →
                      </motion.button>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chatbot;
