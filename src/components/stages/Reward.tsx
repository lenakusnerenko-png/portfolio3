import { useEffect, useState } from "react";
import { config, formatPrize } from "@/config";
import Confetti from "@/components/Confetti";
import { trackEvent } from "@/lib/track";
import { Sparkles, Zap, ShieldCheck, Star, ExternalLink, Gift, ArrowRight } from "lucide-react";

export default function Reward({
  chosenIndex,
}: {
  chosenIndex: number;
}) {
  const chosen = config.vaults[chosenIndex];
  const [count, setCount] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const target = chosen.amount;

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const value = Math.min(target, Math.round((target * frame) / 24));
      setCount(value);
      if (value >= target) {
        clearInterval(id);
        setFlashing(true);
      }
    }, 40);
    return () => clearInterval(id);
  }, [target]);

  const [showClaimMenu, setShowClaimMenu] = useState(false);

  const handleClaim = () => {
    void trackEvent("claim_clicked", { amount: chosen.amount });
    setShowClaimMenu(true);
  };

  const handleGoToSite = () => {
    void trackEvent("claim_link_clicked", { url: config.AFFILIATE_LINK });
    window.open(config.AFFILIATE_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-6 text-center">
      <Confetti />

      {/* Trophy + expanding rings */}
      <div className="relative mb-2 flex items-center justify-center">
        {/* Expanding rings */}
        <span className="absolute h-28 w-28 animate-ring-expand rounded-full border-2 border-vault-lime/50" />
        <span
          className="absolute h-28 w-28 animate-ring-expand rounded-full border-2 border-vault-lime/30"
          style={{ animationDelay: "0.3s" }}
        />
        <span
          className="absolute h-28 w-28 animate-ring-expand rounded-full border-2 border-vault-lime/20"
          style={{ animationDelay: "0.6s" }}
        />
        {/* Rotating light rays */}
        <div className="absolute h-48 w-48 animate-ray-spin">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-28 w-2 origin-bottom bg-gradient-to-t from-vault-lime/0 via-vault-lime/30 to-vault-lime/50"
              style={{
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>
        {/* Trophy badge */}
        <div className="relative animate-trophy-bounce">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-vault-lime to-vault-limeDeep shadow-lime-glow-lg sm:h-20 sm:w-20">
            <Star className="h-8 w-8 fill-vault-black text-vault-black sm:h-10 sm:w-10" strokeWidth={1.5} />
          </div>
        </div>
        {/* Twinkling stars around trophy */}
        {[
          { top: "-10%", left: "10%", delay: "0s" },
          { top: "5%", left: "85%", delay: "0.3s" },
          { top: "70%", left: "5%", delay: "0.6s" },
          { top: "80%", left: "80%", delay: "0.9s" },
          { top: "-5%", left: "50%", delay: "0.15s" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute"
            style={{ top: s.top, left: s.left }}
          >
            <Sparkles className="h-4 w-4 animate-star-twinkle text-vault-limeBright" style={{ animationDelay: s.delay }} />
          </span>
        ))}
      </div>

      {/* Badge */}
      <div className="mt-3 flex items-center gap-2 text-vault-lime animate-scale-in">
        <Sparkles className="h-4 w-4" />
        <span className="font-display text-sm tracking-[0.3em] text-vault-lime/80 sm:text-lg">
          BONUS UNLOCKED
        </span>
        <Sparkles className="h-4 w-4" />
      </div>

      {/* Title */}
      <h1
        className="font-display text-4xl tracking-wide text-shimmer animate-fade-in-up sm:text-6xl"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        {config.texts.congratsTitle}
      </h1>

      <p
        className="mt-2 text-sm text-vault-lime/70 animate-fade-in-up sm:text-base"
        style={{ animationDelay: "0.3s", opacity: 0 }}
      >
        {config.texts.congratsBody}
      </p>

      {/* Big prize amount with flashing + bordered highlight */}
      <div
        className="relative my-5 animate-fade-in-up"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className={`animate-glow-pulse rounded-2xl px-8 py-5 metal-surface sm:rounded-3xl sm:px-12 sm:py-8 ${flashing ? "border-2 border-vault-lime/60" : ""} transition-all duration-500`}>
          <p className="font-display text-[10px] tracking-[0.3em] text-vault-lime/50">
            {chosen.type === "percent" ? "DEPOSIT BONUS" : "CASH BONUS"}
          </p>
          <div className="flex items-baseline justify-center gap-1">
            {chosen.type === "cash" && (
              <span
                className={`font-display text-4xl text-gold-gradient animate-count-up sm:text-6xl ${
                  flashing ? "animate-number-flash" : ""
                }`}
              >
                $
              </span>
            )}
            <span
              className={`font-display text-6xl text-gold-gradient animate-count-up sm:text-8xl ${
                flashing ? "animate-number-flash" : ""
              }`}
            >
              {count}
            </span>
            {chosen.type === "percent" && (
              <span
                className={`font-display text-4xl text-gold-gradient animate-count-up sm:text-6xl ${
                  flashing ? "animate-number-flash" : ""
                }`}
              >
                %
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-vault-lime/40">
            <Zap className="h-3.5 w-3.5" />
            <span>{chosen.type === "percent" ? "on your first deposit" : "instant cash reward"}</span>
          </div>
        </div>
      </div>

      {/* All three vault prizes revealed */}
      <div
        className="mb-5 flex w-full max-w-md items-stretch justify-center gap-2 animate-fade-in-up sm:max-w-lg sm:gap-4"
        style={{ animationDelay: "0.6s", opacity: 0 }}
      >
        {config.vaults.map((v, i) => {
          const isWinner = i === chosenIndex;
          return (
            <div
              key={v.id}
              className={`flex-1 rounded-xl border px-2 py-3 transition-all sm:rounded-2xl sm:px-3 sm:py-4 ${
                isWinner
                  ? "border-vault-lime bg-vault-lime/10 shadow-lime-glow"
                  : "border-vault-lime/20 bg-vault-graphite/60 opacity-50"
              }`}
            >
              <p className="font-display text-[10px] tracking-widest text-vault-lime/60 sm:text-xs">
                {v.name}
              </p>
              <p
                className={`mt-1 font-display text-xl sm:text-3xl ${
                  isWinner ? "text-gold-gradient" : "text-vault-lime/40"
                }`}
              >
                {formatPrize(v)}
              </p>
              {isWinner && (
                <p className="mt-1 font-display text-[9px] tracking-[0.2em] text-vault-lime sm:text-xs">
                  YOUR PRIZE
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p
        className="mb-4 max-w-sm text-xs text-vault-lime/60 animate-fade-in-up sm:text-sm"
        style={{ animationDelay: "0.7s", opacity: 0 }}
      >
        {config.texts.bonusLabel}
      </p>

      {/* Claim CTA */}
      <button
        onClick={handleClaim}
        className="btn-gold rounded-2xl px-8 py-4 font-display text-xl tracking-widest animate-fade-in-up animate-glow-pulse sm:text-3xl"
        style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "both" }}
      >
        {config.texts.claimButton}
      </button>

      {/* Instant activation hint */}
      <div
        className="mt-3 flex items-center gap-2 text-xs text-vault-lime/50 animate-fade-in-up"
        style={{ animationDelay: "0.95s", opacity: 0, animationFillMode: "both" }}
      >
        <Zap className="h-3.5 w-3.5" />
        <span>Instant activation</span>
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Secure claim</span>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 max-w-md text-[10px] leading-relaxed text-vault-lime/30 animate-fade-in sm:text-xs">
        {config.texts.disclaimer}
      </p>

      {/* Claim menu modal */}
      {showClaimMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-vault-black/80 px-4 animate-fade-in"
          onClick={() => setShowClaimMenu(false)}
        >
          <div
            className="glass-card relative w-full max-w-sm rounded-3xl p-6 animate-scale-in sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowClaimMenu(false)}
              className="absolute right-4 top-4 text-vault-lime/40 transition-colors hover:text-vault-lime"
            >
              <span className="text-xl leading-none">x</span>
            </button>

            {/* Gift icon */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-vault-lime to-vault-limeDeep shadow-lime-glow-lg">
                <Gift className="h-8 w-8 fill-vault-black text-vault-black" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="font-display text-2xl tracking-wide text-gold-gradient sm:text-3xl">
              You won $50!
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-vault-lime/70">
              Your exclusive $50 bonus is ready. Click below to activate it on the official site.
            </p>

            {/* Bonus highlight */}
            <div className="my-4 rounded-xl border border-vault-lime/30 bg-vault-lime/5 px-4 py-3">
              <p className="font-display text-[10px] tracking-[0.3em] text-vault-lime/50">CASH BONUS</p>
              <p className="font-display text-3xl text-gold-gradient">$50</p>
            </div>

            {/* Link button */}
            <button
              onClick={handleGoToSite}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-lg tracking-widest"
            >
              ACTIVATE BONUS
              <ArrowRight className="h-5 w-5" />
            </button>

            <a
              href={config.AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 text-xs text-vault-lime/50 transition-colors hover:text-vault-lime"
            >
              <ExternalLink className="h-3 w-3" />
              bc-game-casino.cfd
            </a>

            <p className="mt-3 text-[10px] leading-relaxed text-vault-lime/30">
              You will be redirected to the official partner site to activate your bonus.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
