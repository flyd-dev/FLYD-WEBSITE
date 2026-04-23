"use client";

import { motion } from "framer-motion";

interface HandWrittenCircleProps {
    children: React.ReactNode;
    className?: string;
    strokeClassName?: string;
}

function HandWrittenCircle({
    children,
    className,
    strokeClassName = "text-flyd-ink opacity-90",
}: HandWrittenCircleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className ?? ""}`}>
            <motion.svg
                viewBox="0 0 1200 600"
                preserveAspectRatio="none"
                initial="hidden"
                animate="visible"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-8 z-20 h-[calc(100%+4rem)] w-[calc(100%+5rem)]"
            >
                <motion.path
                    d="M 950 90
                       C 1250 300, 1050 480, 600 520
                       C 250 520, 150 480, 150 300
                       C 150 120, 350 80, 600 80
                       C 850 80, 950 180, 950 180"
                    fill="none"
                    strokeWidth="12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={draw}
                    className={strokeClassName}
                />
            </motion.svg>
            <div className="relative z-0">{children}</div>
        </div>
    );
}

export { HandWrittenCircle };
