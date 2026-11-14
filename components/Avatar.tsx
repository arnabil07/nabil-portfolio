"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCoarsePointer, useReducedMotion } from "@/hooks/useMedia";

/**
 * Hero avatar: a static transparent illustration with a very subtle pointer tilt on desktop.
 * No waving / greeting animation. Tilt is disabled for reduced-motion and touch devices.
 */
export default function Avatar({ src = "/images/avatar.webp" }: { src?: string }) {
  const reduced = useReducedMotion();
  const touch = useCoarsePointer();
  const still = reduced || touch;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), {
    stiffness: 90,
    damping: 22,
  });
  const translateX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 90,
    damping: 24,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="relative w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ perspective: 1100 }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX: still ? 0 : rotateX,
          rotateY: still ? 0 : rotateY,
          x: still ? 0 : translateX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        <Image
          src={src}
          alt="Illustration of A R Nabil, a smiling developer in round glasses and a black hoodie"
          width={1217}
          height={1292}
          priority
          draggable={false}
          className="h-auto w-full select-none drop-shadow-[0_24px_35px_rgba(20,10,30,0.18)]"
        />
      </motion.div>
    </div>
  );
}
