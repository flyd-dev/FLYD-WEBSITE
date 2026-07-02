'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  classNames?: string[];
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorAnimationVariants?: {
    initial: Variants['initial'];
    animate: Variants['animate'];
  };
  cursorClassName?: string;
}

const Typewriter = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  classNames,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = '|',
  cursorClassName = 'ml-1',
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: 'reverse',
      },
    },
  },
}: TypewriterProps) => {
  // Første frase rendres ferdig skrevet på serveren, slik at H1 er komplett i
  // statisk HTML (SEO/skjermlesere/JS av). Animasjonen tar over etter mount.
  const firstText = Array.isArray(text) ? text[0] : text;
  const [displayText, setDisplayText] = useState(firstText);
  const [currentIndex, setCurrentIndex] = useState(firstText.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    // Ved redusert bevegelse: stå stille på første frase.
    if (reducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    const currentText = texts[currentTextIndex];

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false);
          if (currentTextIndex === texts.length - 1 && !loop) {
            return;
          }
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setCurrentIndex(0);
          timeout = setTimeout(() => {}, waitTime);
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
          }, deleteSpeed);
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          }, speed);
        } else if (texts.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, waitTime);
        }
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    currentTextIndex,
    loop,
    initialDelay,
    reducedMotion,
  ]);

  const activeClass =
    classNames && classNames.length > 0
      ? classNames[currentTextIndex % classNames.length]
      : className;

  return (
    <span className={cn('inline tracking-tight', activeClass)}>
      <span>{displayText}</span>
      {showCursor && !reducedMotion && (
        <motion.span
          variants={cursorAnimationVariants}
          className={cn(
            cursorClassName,
            hideCursorOnType &&
              (currentIndex < texts[currentTextIndex].length || isDeleting)
              ? 'hidden'
              : ''
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

export { Typewriter };
