'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';

export type ArgumentItem = {
  title: string;
  description: React.ReactNode;
  /** optional: pass a ReactNode icon (preferred) */
  icon?: React.ReactNode;
  /** optional: or pass an image src from /public */
  iconSrc?: string;
};

type Props = {
  title?: React.ReactNode;
  items: ArgumentItem[];
  className?: string;
};

function HexagonIconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-28 h-28 rounded-[18px] bg-white flex items-center justify-center drop-shadow-md"
      whileHover={{ rotate: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export default function ThreeArguments({ title = '3 gute Vorteile', items, className = '' }: Props) {
  return (
    <section className={`w-full ${className} bg-[#351B59] text-white py-12 md:py-20`}>
      <div className="max-w-7xl mx-auto px-1">
        <ScrollReveal className="text-center mb-10" direction="up">
          <h2 className="text-2xl md:text-4xl">{title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((it, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <motion.article
                className="flex flex-col items-center text-center rounded-3xl p-6"
                transition={{ type: 'spring', stiffness: 160, damping: 16 }}
              >
                <div className="mb-6 md:mb-6">
                  {it.icon ? (
                    <HexagonIconWrapper>{it.icon}</HexagonIconWrapper>
                  ) : it.iconSrc ? (
                    <HexagonIconWrapper>
                      <Image src={it.iconSrc} alt={it.title} width={88} height={88} className="w-16 h-16 object-contain" />
                    </HexagonIconWrapper>
                  ) : (
                    <HexagonIconWrapper>
                      {/* fallback simple dot */}
                      <div className="w-8 h-8 rounded-full bg-green-300" />
                    </HexagonIconWrapper>
                  )}
                </div>

                <h3 className="text-lg md:text-xl mb-3 md:mb-4 text-white">{it.title}</h3>

                <div className="text-white max-w-[38ch]">
                  <p>{it.description}</p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
