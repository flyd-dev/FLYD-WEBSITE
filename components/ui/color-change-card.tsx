'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  imgSrc: string;
}

interface ColorChangeCardsProps {
  steps: ProcessStep[];
  className?: string;
}

export default function ColorChangeCards({ steps, className }: ColorChangeCardsProps) {
  return (
    <div
      className={
        'grid grid-cols-1 gap-[1px] bg-flyd-ink/10 sm:grid-cols-2 ' + (className ?? '')
      }
    >
      {steps.map((step) => (
        <Card key={step.n} step={step} />
      ))}
    </div>
  );
}

interface CardProps {
  step: ProcessStep;
}

const Card = ({ step }: CardProps) => {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="group relative h-72 w-full cursor-pointer overflow-hidden bg-flyd-teal-dark md:h-80"
    >
      <div
        className="absolute inset-0 scale-[1.08] blur-[5px] brightness-[0.62] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.14] group-hover:blur-[2px] group-hover:brightness-[0.7]"
        style={{
          backgroundImage: `url(${step.imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />

      <div className="relative z-20 flex h-full flex-col justify-between p-7 md:p-8 text-flyd-paper">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-4xl font-semibold tracking-tighter text-flyd-paper">
            {step.n}
          </span>
          <ArrowRight
            className="h-6 w-6 text-flyd-paper transition-transform duration-500 ease-out group-hover:-rotate-45"
            strokeWidth={1.75}
          />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">
            {step.title.split('').map((letter, index) => (
              <AnimatedLetter letter={letter} key={index} />
            ))}
          </h3>
          <p className="mt-3 max-w-[34ch] text-[14.5px] leading-relaxed text-flyd-paper/90">
            {step.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const letterVariants: Variants = {
  hover: { y: '-50%' },
};

interface AnimatedLetterProps {
  letter: string;
}

const AnimatedLetter = ({ letter }: AnimatedLetterProps) => {
  if (letter === ' ') return <span className="inline-block w-[0.3em] align-bottom" />;
  return (
    <span className="inline-block h-[30px] overflow-hidden align-bottom">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: '0%' }}
        variants={letterVariants}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </span>
  );
};
