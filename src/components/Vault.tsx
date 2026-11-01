import { Lock } from "lucide-react";
import { PrizeType } from "@/config";

type VaultProps = {
  opening?: boolean;
  attempting?: boolean;
  revealed?: boolean;
  size?: "xs" | "sm" | "md";
  prize?: number;
  prizeType?: PrizeType;
  accent?: "lime" | "dim" | "ghost";
};

export default function Vault({
  opening = false,
  attempting = false,
  revealed = false,
  size = "md",
  prize,
  prizeType = "cash",
  accent = "lime",
}: VaultProps) {
  const isXs = size === "xs";
  const isSm = size === "sm";
  const bodyH = isXs ? "h-36" : isSm ? "h-52" : "h-72 sm:h-80";
  const bodyW = isXs ? "w-32" : isSm ? "w-44" : "w-64 sm:w-72";
  const dial = isXs ? "h-12 w-12" : isSm ? "h-16 w-16" : "h-24 w-24";
  const lockIcon = isXs ? "h-5 w-5" : isSm ? "h-7 w-7" : "h-10 w-10";
  const tickShift = isXs ? 26 : isSm ? 32 : 44;
  const isGhost = accent === "ghost";
  const borderClass =
    accent === "lime"
      ? "border-vault-lime/30"
      : isGhost
      ? "border-vault-lime/10"
      : "border-vault-lime/15";

  return (
    <div className="relative" style={{ perspective: "900px" }}>
      {attempting && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-radar rounded-full border-2 border-vault-lime/40" />
      )}

      <div
        className={`absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-700 ${
          revealed ? "bg-vault-lime/40 opacity-100" : "bg-vault-lime/20 opacity-60"
        }`}
      />

      <div className={`relative ${bodyH} ${bodyW} ${isGhost ? "opacity-35 saturate-50" : ""}`}>
        {/* Frame */}
        <div className={`metal-surface absolute inset-0 rounded-2xl ${borderClass} ${isGhost ? "bg-vault-graphite/40" : ""}`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={`t-${i}`}
              className="absolute top-3 h-2.5 w-2.5 rounded-full bg-gradient-to-b from-vault-lime/80 to-vault-limeDark/40 shadow-inner"
              style={{ left: `${15 + i * 17.5}%` }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={`b-${i}`}
              className="absolute bottom-3 h-2.5 w-2.5 rounded-full bg-gradient-to-b from-vault-lime/80 to-vault-limeDark/40 shadow-inner"
              style={{ left: `${15 + i * 17.5}%` }}
            />
          ))}
        </div>

        {/* Door */}
        <div
          className={`absolute left-3 top-3 bottom-3 right-3 origin-left rounded-xl ${
            opening ? "animate-door-open" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`metal-surface relative h-full w-full rounded-xl ${isGhost ? "bg-vault-graphite/40" : ""}`}>
            {revealed && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-vault-lime/0 via-vault-lime/20 to-vault-lime/50" />
            )}

            <div className="absolute inset-4 rounded-lg border border-vault-lime/20 bg-gradient-to-br from-vault-graphiteLight/60 to-vault-black/80" />

            {revealed && prize !== undefined && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`font-display text-gold-gradient animate-count-up ${
                    isXs ? "text-3xl" : isSm ? "text-4xl" : "text-6xl"
                  }`}
                >
                  {prizeType === "cash" ? `${prize}` : `${prize}%`}
                </span>
              </div>
            )}

            {/* Dial / lock */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={`flex ${dial} items-center justify-center rounded-full border-2 border-vault-lime/50 bg-gradient-to-br from-vault-graphiteLight to-vault-black shadow-inner-lime ${
                  attempting ? "animate-spin-dial" : ""
                }`}
              >
                <Lock
                  className={`${lockIcon} text-vault-lime transition-opacity ${
                    revealed ? "opacity-0" : "opacity-100"
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              {!revealed &&
                Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1.5 w-0.5 origin-bottom bg-vault-lime/40"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-${tickShift}px)`,
                    }}
                  />
                ))}
            </div>

            <div className="absolute right-3 top-1/2 h-3 w-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-vault-limeDark to-vault-lime shadow-lime-glow" />
          </div>
        </div>

        {/* Hinges */}
        <span className="absolute left-2 top-8 h-4 w-2.5 rounded bg-gradient-to-b from-vault-lime/70 to-vault-limeDark/30" />
        <span className="absolute left-2 bottom-8 h-4 w-2.5 rounded bg-gradient-to-b from-vault-lime/70 to-vault-limeDark/30" />
      </div>
    </div>
  );
}
