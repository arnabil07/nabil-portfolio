"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useCoarsePointer, useReducedMotion } from "@/hooks/useMedia";

const fields = [
  { label: "Location", value: profile.location },
  { label: "Speciality", value: profile.speciality },
  { label: "Interest", value: profile.interests },
  { label: "Status", value: profile.status },
];

export default function DigitalIDCard() {
  const reduced = useReducedMotion();
  const touch = useCoarsePointer();
  const tiltOff = reduced || touch;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Tilt is intentionally gentle (±7° / ±6°) so it reads as premium, not playful.
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 110, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (tiltOff || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    // Three owners, three elements: Framer = entrance (here) + tilt (article); CSS = float/sway/shadow.
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
      className="w-full max-w-[262px]"
    >
      <div className="relative">
        <div className={tiltOff ? "" : "id-float"}>
          <motion.article
            aria-label="Digital identity card"
            onPointerMove={onMove}
            onPointerLeave={reset}
            style={{ rotateX: tiltOff ? 0 : rotateX, rotateY: tiltOff ? 0 : rotateY, transformStyle: "preserve-3d" }}
            className="relative isolate overflow-hidden rounded-2xl border border-white/80 bg-[linear-gradient(145deg,#fffdfa_0%,#f5f0ed_52%,#e9e1dc_100%)] p-4 text-ink shadow-[0_28px_55px_-20px_rgba(30,18,45,0.42),0_10px_24px_-12px_rgba(128,96,183,0.55),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-ink/10 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[linear-gradient(115deg,transparent_15%,rgba(255,255,255,0.72)_42%,transparent_68%)] before:opacity-70"
          >
            <div className="relative flex items-start justify-between" style={{ transform: "translateZ(18px)" }}>
              <p className="eyebrow text-[10px]! font-bold">Digital Identity</p>
              <p className="flex items-center gap-1.5 text-[9px] font-semibold tracking-widest text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" aria-hidden />
                ONLINE
              </p>
            </div>

            <div className="relative mt-3 flex gap-3" style={{ transformStyle: "preserve-3d" }}>
              <div
                className="relative h-[72px] w-[58px] shrink-0 overflow-hidden rounded bg-gradient-to-b from-[#ddd6d2] to-[#c9c0bb]"
                style={{ transform: "translateZ(24px)" }}
                aria-hidden
              >
                <Image
                  src="/images/avatar.webp"
                  alt=""
                  fill
                  sizes="58px"
                  className="origin-[50%_22%] scale-[2.1] object-contain object-top"
                />
              </div>
              <div style={{ transform: "translateZ(16px)" }}>
                <h3 className="font-display text-lg font-bold leading-tight">{profile.name}</h3>
                <p className="mt-0.5 text-xs">{profile.title}</p>
                <p className="mt-1 text-[10px] text-ink/60">ID: {profile.idNumber}</p>
              </div>
            </div>

            <dl className="relative mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-ink/15 pt-3" style={{ transform: "translateZ(10px)" }}>
              {fields.map((f) => (
                <div key={f.label}>
                  <dt className="text-[8px] font-semibold uppercase tracking-widest text-ink/50">{f.label}</dt>
                  <dd className="text-[11px] font-medium leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-3 flex items-end justify-between border-t border-ink/15 pt-2.5" style={{ transform: "translateZ(14px)" }}>
              <p className="text-[8px] font-medium uppercase tracking-widest text-ink/60">Personal Portfolio · 2026</p>
              <span className="font-serif text-base italic text-violet" aria-hidden>
                N.
              </span>
            </div>
          </motion.article>
        </div>

        {/* soft ground shadow — shrinks/fades as the card rises */}
        {!tiltOff && (
          <span
            aria-hidden
            className="id-shadow pointer-events-none absolute inset-x-8 -bottom-5 h-4 rounded-[50%] bg-violet/50 blur-lg"
          />
        )}
      </div>
    </motion.div>
  );
}
