import { useMemo } from "react";

type Piece = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
};

const COLORS = ["#ccff33", "#b4f000", "#22c55e", "#f0ffcc", "#7da600", "#2dd4bf"];

/**
 * Confetti burst: falling pieces from the top + a radial burst from center.
 */
export default function Confetti({ count = 100 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  const burst = useMemo(
    () =>
      Array.from({ length: 28 }, () => {
        const angle = Math.random() * 360;
        const distance = 120 + Math.random() * 250;
        const rad = (angle * Math.PI) / 180;
        return {
          tx: Math.cos(rad) * distance,
          ty: Math.sin(rad) * distance,
          delay: Math.random() * 0.2,
          duration: 0.8 + Math.random() * 0.6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 5 + Math.random() * 7,
          rotate: Math.random() * 360,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Falling confetti */}
      {pieces.map((p, i) => (
        <div
          key={`f-${i}`}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.6}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 8px ${p.color}66`,
          }}
        />
      ))}

      {/* Radial burst from center */}
      <div className="absolute left-1/2 top-1/2">
        {burst.map((b, i) => (
          <span
            key={`b-${i}`}
            className="block"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundColor: b.color,
              borderRadius: "2px",
              boxShadow: `0 0 8px ${b.color}`,
              animationName: "burst-out",
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.4, 1)",
              animationFillMode: "forwards",
              transform: `translate(0, 0) rotate(${b.rotate}deg)`,
              ["--tx" as string]: `${b.tx}px`,
              ["--ty" as string]: `${b.ty}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
