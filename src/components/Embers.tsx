import { useMemo } from "react";

type Ember = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
};

export default function Embers({ count = 24 }: { count?: number }) {
  const embers = useMemo<Ember[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {embers.map((e, i) => (
        <div
          key={i}
          className="absolute bottom-0 animate-ember-rise rounded-full bg-vault-lime"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            opacity: e.opacity,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            boxShadow: "0 0 6px #b4f000",
          }}
        />
      ))}
    </div>
  );
}
