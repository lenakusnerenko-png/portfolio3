import { useState } from "react";
import { config } from "@/config";
import Vault from "@/components/Vault";
import { Shield, Lock, Star, Users, Zap, ChevronRight, Trophy, BadgeCheck, Clock, TrendingUp } from "lucide-react";

export default function Landing({
  onPick,
}: {
  onPick: (index: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => onPick(i), 800);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
      {/* Aurora glow behind content */}
      <div className="aurora-glow pointer-events-none absolute inset-0 z-0" />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        {/* Live indicator + badge */}
        <div className="mb-4 flex items-center gap-2 animate-fade-in-up" style={{ opacity: 0 }}>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-vault-green" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vault-green" />
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-vault-green">LIVE</span>
          </span>
          <span className="trust-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <Zap className="h-3 w-3 text-vault-lime" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-vault-lime/80">
              {config.texts.topBadge}
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-5xl leading-[0.95] tracking-wide animate-fade-in-up sm:text-7xl"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <span className="text-vault-lime/90">{config.texts.headline}</span>
          <br />
          <span className="text-shimmer">{config.texts.headlineAccent}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-3 max-w-md text-sm leading-relaxed text-vault-lime/60 animate-fade-in-up sm:text-base"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          {config.texts.subheadline}
        </p>

        {/* Hint with arrow */}
        <p
          className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-vault-lime/50 animate-fade-in-up sm:text-sm"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <span className="h-px w-6 bg-vault-lime/30" />
          CLICK A VAULT TO OPEN IT
          <span className="h-px w-6 bg-vault-lime/30" />
        </p>

        {/* Vaults — clickable, all identical size, outer two ghost/transparent */}
        <div
          className="mt-6 flex items-end justify-center gap-3 animate-fade-in-up sm:gap-8"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {config.vaults.map((v, i) => {
            const isPicked = selected === i;
            const isDimmed = selected !== null && selected !== i;
            return (
              <button
                key={v.id}
                onClick={() => handlePick(i)}
                disabled={selected !== null}
                className={`group relative flex flex-col items-center transition-all duration-500 ${
                  isDimmed ? "scale-90 opacity-20" : ""
                } ${isPicked ? "scale-110" : ""}`}
              >
                {isPicked && (
                  <span className="absolute -top-2 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 animate-scale-in items-center justify-center rounded-full bg-vault-lime text-vault-black shadow-lime-glow">
                    <ChevronRight className="h-5 w-5" strokeWidth={3} />
                  </span>
                )}

                {/* Pulse ring on hover */}
                {!isPicked && !isDimmed && (
                  <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-vault-lime/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-pulse-ring" />
                )}

                <div
                  className={`animate-vault-bob transition-all duration-300 group-hover:-translate-y-2 ${
                    isPicked ? "shadow-lime-glow-lg" : "group-hover:shadow-lime-glow"
                  }`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <Vault size="xs" accent="lime" />
                </div>

                <span
                  className="mt-2 font-display text-sm tracking-widest text-vault-lime/70 transition-colors group-hover:text-vault-lime"
                >
                  {v.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Unlocking hint */}
        {selected !== null && (
          <p className="mt-5 flex items-center gap-2 text-sm text-vault-lime/70 animate-fade-in">
            <Lock className="h-4 w-4 animate-spin-dial" />
            Unlocking your vault...
          </p>
        )}

        {/* Trust stats cards */}
        <div
          className="mt-7 grid w-full max-w-lg grid-cols-2 gap-3 animate-fade-in-up sm:grid-cols-4"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          <StatCard icon={<Users className="h-4 w-4" />} value={config.trust.playersOnline} label="Online now" />
          <StatCard icon={<Star className="h-4 w-4 fill-vault-lime text-vault-lime" />} value={`${config.trust.rating}/5`} label="Rating" />
          <StatCard icon={<TrendingUp className="h-4 w-4" />} value={config.trust.totalPaidOut} label="Paid out" />
          <StatCard icon={<BadgeCheck className="h-4 w-4" />} value="100%" label="Fair" />
        </div>

        {/* Trust badges row */}
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 animate-fade-in-up"
          style={{ animationDelay: "0.85s", opacity: 0 }}
        >
          <Pill icon={<Shield className="h-3.5 w-3.5" />} text="Provably Fair" />
          <Pill icon={<Lock className="h-3.5 w-3.5" />} text="SSL Secured" />
          <Pill icon={<Clock className="h-3.5 w-3.5" />} text="Instant Payouts" />
          <Pill icon={<Trophy className="h-3.5 w-3.5" />} text="Verified Prizes" />
        </div>

        {/* Steps */}
        <div
          className="mt-6 flex items-center justify-center gap-2 text-[11px] tracking-wider text-vault-lime/40 animate-fade-in-up sm:text-xs"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-vault-lime/30 text-[9px] font-bold text-vault-lime/60">1</span>
            Pick
          </span>
          <ChevronRight className="h-3 w-3 text-vault-lime/20" />
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-vault-lime/30 text-[9px] font-bold text-vault-lime/60">2</span>
            Unlock
          </span>
          <ChevronRight className="h-3 w-3 text-vault-lime/20" />
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-vault-lime/30 text-[9px] font-bold text-vault-lime/60">3</span>
            Claim
          </span>
        </div>

        {/* Terms line */}
        <p
          className="mt-5 max-w-md text-[10px] leading-relaxed text-vault-lime/30 animate-fade-in-up sm:text-xs"
          style={{ animationDelay: "1.15s", opacity: 0 }}
        >
          {config.texts.disclaimer}
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card flex flex-col items-center gap-1 rounded-xl px-2 py-3">
      <span className="text-vault-lime">{icon}</span>
      <span className="font-display text-base text-gold-gradient sm:text-lg">{value}</span>
      <span className="text-[9px] font-medium tracking-wider text-vault-lime/50 sm:text-[10px]">{label}</span>
    </div>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="trust-pill flex items-center gap-1.5 rounded-full px-2.5 py-1">
      <span className="text-vault-lime">{icon}</span>
      <span className="text-[11px] font-medium tracking-wide text-vault-lime/70 sm:text-xs">
        {text}
      </span>
    </span>
  );
}
